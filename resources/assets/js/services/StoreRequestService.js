import Vue from 'vue';
import Service from './Service.js';

class StoreRequest extends Service {
	constructor() {
		super();
		//this.config.endpointUrl = 'productos'; //Override endpointUrl
		//this.config.origin = 'http://api.myapp.com'; //Override endpointUrl
		this.config.prefix = '/admin/';
	}


	evaluate(id, data) {
		console.log(id, data)
		var endpoint = this.buildUrl(`/${id}/evaluate`);
		var resource_promise = new Promise((resolve, reject) => {
			Vue.http.put(endpoint, data)
				.then((resource) => {
					resolve(resource.data); // Deberiamos definir las convenciones para cuando recibamos una collección
				})
				.catch((err) => {
					reject(err);
				});
		});

		return resource_promise;
	}


}
export default StoreRequest;