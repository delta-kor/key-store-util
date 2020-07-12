import { assert } from 'chai';
import { KeyStore } from '../src/keystore';

describe('Key saving', function() {

  const keystore = new KeyStore();

  it('Key adding ( no expire time )', function() {
    assert.isTrue(keystore.saveKey('keyA', 'value'));
  });

  it('Key adding ( expire time Date )', function() {
    assert.isTrue(keystore.saveKey('keyB', 'value', new Date(new Date().getTime() + 600000)));
  });

  it('Key adding ( expire time number )', function() {
    assert.isTrue(keystore.saveKey('keyC', 'value', 1));
  });

  it('Key adding ( duplicated key )', function() {
    assert.isFalse(keystore.saveKey('keyC', 'value'), 'Return value');
    assert.equal(keystore.length, 3, 'Keystore length');
  });

  it('Key adding ( past expire time )', function() {
    assert.isFalse(keystore.saveKey('keyB', 'value', new Date(new Date().getTime() - 600000)), 'Return value');
    assert.equal(keystore.length, 3, 'Keystore length');
  });

})
