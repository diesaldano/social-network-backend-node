const config = require('../../../config/config');

let store, cache;
console.log(config.remoteDB)
if(config.remoteDB == true){
    store = require('../../../store/remote-mysql');
    cache = require('../../../store/remote-cache')
} else {
    store = require('../../../store/mysql');
    cache = require ('../../../store/redis')
}

const ctrl = require('./controller');

module.exports = ctrl(store, cache);