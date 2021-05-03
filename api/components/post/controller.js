const TABLA = 'post';

module.exports = function(injectStore){
	let store = injectStore;
	if(!store){
		store = require('../../../store/dummy')
	}

	function list(){
		return store.list(TABLA);
	}
	return {
		list
	}
}