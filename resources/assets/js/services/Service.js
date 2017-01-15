import Vue from 'vue';
import Pluralize from 'pluralize';
import ToSnake from 'to-snake-case';
import _ from 'lodash';
class Service {
	constructor() {
		this.initService();
	}

	getClassName() {
		return this.constructor.name;
	}

	initService() {
		this.model = null;
		this.parentRootClass = 'Service';
		this.config = {
			origin: window.location.origin,
			prefix: '/',
			endpointUrl: Pluralize(_.kebabCase(this.getClassName()))
		};
	}

	buildUrl(params = '') {
		var prefix = this.config.prefix;
		var origin = this.config.origin;
		var endpoint = this.config.endpointUrl;

		return origin + prefix + endpoint + params;
	}

	all(params) {
		params = typeof params == 'undefined' ? '' : params;
		params = params == null ? '' : params;

		var that = this;
		var endpoint = this.buildUrl(params)
		var resource_promise = new Promise((resolve, reject) => {
			Vue.http.get(endpoint + params)
				.then((collection) => {
					resolve(collection.data); // Deberiamos definir las convenciones para cuando recibamos una collección
				})
				.catch((err) => {
					reject(err);
				});
		});
		return resource_promise;
	}

	find(id) {
		if (!id) {
			throw "ID is needed";
			return;
		}

		var that = this;
		var endpoint = this.buildUrl() + "/" + id;
		var resource_promise = new Promise((resolve, reject) => {
			Vue.http.get(endpoint)
				.then((data) => {
					var preparedData = that.prepareItem(data.data);
					resolve(preparedData); // Deberiamos definir las convenciones para cuando recibamos una collección
				})
				.catch((err) => {
					reject(err);
				});
		});
		return resource_promise;
	}

	create(data) {
		if (!data) {
			throw "data is needed";
			return;
		}

		var endpoint = this.buildUrl();
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

	update(id, data) {
		data._method = 'put';
		var endpoint = this.buildUrl() + "/" + id;
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

	delete(id) {
		var endpoint = this.buildUrl() + "/" + id;
		var resource_promise = new Promise((resolve, reject) => {
			Vue.http.delete(endpoint, data)
				.then((data) => {
					resolve(data.data); // Deberiamos definir las convenciones para cuando recibamos una collección
				})
				.catch((err) => {
					reject(err);
				});
		});
		return resource_promise;
	}

	prepareCollection(collection) {
		var that = this;
		if (this.model) {
			collection.data = collection.data.map(item => {
				return that.parseItem(item);
			});
		}
		return collection;
	}

	prepareItem(item) {
		if (this.model) {
			return this.parseItem(item);
		}
		return item;
	}

	parseItem(item) {
		return new this.model(item)
	}

	loadModel(model) {
		this.model = model;
	}
}

export default Service;