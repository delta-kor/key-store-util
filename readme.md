# Key Store Util

## Usage

### Initializing
```javascript
const KeyStore = require('key-store-util');
const keyStore = new KeyStore();
```

### Storing Key
```javascript
// default saving
keystore.saveKey('key1', 'value1');

// expired saving
keystore.saveKey('key2', 'value2', new Date('2020-01-01'));

// expired saving ( minutes )
keystore.saveKey('key3', 'value3', 3);
```

### Getting value
```javascript
// value
keystore.get('key1').value;

// key
keystore.get('key1').key;

// expire time
keystore.get('key1').expiredAfter;
```

## License
[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)
* [MIT License](http://opensource.org/licenses/mit-license.php)
