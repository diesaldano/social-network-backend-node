const request = require('request');

function createRemoteDB(host, port){
	const URL = 'https'+host+':'+port;
	
	function list(table){
			return require('GET', table);
	}

	function req(methos, table, data){
		let url = URL + '/' + table;
		body;

		return new Promise((resolve, reject)=>{
			request({
				methos,
				headers: {
					'content-type': 'application/json'
				},
				url,
				body,
			}, (err, req, body)=>{
				if(err){
					console.error('Error con la base de datos remota'. err);
					return reject(err.message);
				}
				const resp = JSON.parse(body);
				return resolve(resp.body)
			})
		})
	}
	return {
		list
	}
}

module.exports = createRemoteDB