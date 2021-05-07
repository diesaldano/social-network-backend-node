const config = require('../../../config/config');

let store;
if(confirm.remoteDB === true){
    store = require('../../../store/remote-mysql');
} else {
    store = require('../../../store/mysql');
}

const ctrl = require('./controller');

module.exports = ctrl(store);