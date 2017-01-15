import Vue from 'vue';
import Service from './Service.js';

class Post extends Service {

	constructor() {
		super();
		this.config.prefix = '/admin/';
		// this.config.origin = 'https://api.facebook.com';
		// this.config.endpointUrl = 'store-requests/';
	}

	getSuffix(data) {
		var that = this;
		var endpoint = this.buildUrl('/my-suffix');
		var resource_promise = new Promise((resolve, reject) => {
			Vue.http.post(endpoint, data)
				.then((data) => {
					resolve(data.data); // Deberiamos definir las convenciones para cuando recibamos una collección
				})
				.catch((err) => {
					reject(err);
				});
		});
		return resource_promise;

	}


}
export default Post;