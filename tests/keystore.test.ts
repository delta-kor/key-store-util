import { assert } from 'chai';
import { KeyStore } from '../src/keystore';

describe('Key saving', function() {

  const keystore = new KeyStore();

  it('Key adding ( no expire time )', function() {
    assert.isTrue(keystore.saveKey('keyA', 'valueA'));
  });

  it('Key adding ( expire time Date )', function() {
    assert.isTrue(keystore.saveKey('keyB', 'valueB', new Date(new Date().getTime() + 600000)));
  });

  it('Key adding ( expire time number )', function() {
    assert.isTrue(keystore.saveKey('keyC', 'valueC', 1));
  });

  it('Key adding ( duplicated key )', function() {
    assert.isFalse(keystore.saveKey('keyC', 'valueA'), 'Return value');
    assert.equal(keystore.length, 3, 'Keystore length');
  });

  it('Key adding ( past expire time )', function() {
    assert.isFalse(keystore.saveKey('keyB', 'valueB', new Date(new Date().getTime() - 600000)), 'Return value');
    assert.equal(keystore.length, 3, 'Keystore length');
  });

  it('Value', function() {
    assert.equal(keystore.get('keyA')!.value, 'valueA');
  });

  it('Value ( no key )', function() {
    assert.equal(keystore.get('keyX'), null);
  });

})
