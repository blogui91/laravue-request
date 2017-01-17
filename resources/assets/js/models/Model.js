import _ from 'lodash';
import SuperValidator from './Validator.js';
import Helper from './Helpers.js';
//import SuperValidator from 'easiest-js-validator';
class Model {
	constructor(data) {
		this.attributes = {};
		//this.status busy, created / updated /deleted
		this.Service = null;

		this.rulesForCreation = {};
		this.rulesForUpdate = {};
		this.messages = {};
		this.errors = {};
	}

	fill(data) {
		if (typeof data != 'undefined') {
			_.each(this.attributes, function(attribute, key) {
				if (typeof data[key] !== 'undefined') {
					this.attributes[key] = data[key]
				}
			}.bind(this));
		}
	}

	validForCreation() {
		var validate = SuperValidator.make(this.attributes, this.rulesForCreation, this.messages);
		this.errors = validate;
		this.checked = true;
		return validate;
	}

	validForUpdate() {
		let validate = SuperValidator.make(this.attributes, this.rulesForUpdate, this.messages);
		this.errors = validate;
		this.checked = true;
		return validate;
	}

	hasError(key) {
		console.log(this.errors[key])
		return !(typeof this.errors[key] == 'undefined');
	}

	getErrors(key) {
		if (typeof this.errors[key] != 'undefined') {
			return this.errors[key];
		}
		return [];
	}


	getFirstError(key) {
		if (typeof this.errors[key] != 'undefined') {
			return Helper.first(this.errors[key]);
		} else {
			return -1;
		}
	}

	passes() {
		if (typeof this.checked == 'undefined') {
			return undefined;
		}

		let i = 0;
		for (let e in this.errors) {
			i++;
		}
		return i == 0;
	}

	fails() {
		if (typeof this.checked == 'undefined') {
			return undefined;
		}

		let i = 0;
		for (let e in this.errors) {
			i++;
		}
		return i > 0;
	}

	onUpdate() {}

	onCreate() {}

	loadService(service) {
		if (typeof service == 'undefined') {
			throw "You don't have a Service for this model!"
			return;
		}
		if (service.parentRootClass == 'Service') {
			this.Service = service;
			return
		}
		throw "Error loading service, variable type Service is needed, You sent " + service.constructor.name
	}

	save() {
		var data = this.attributes;
		var that = this;
		var validator, updating = true;

		if (this.Service) {
			var Service = this.Service;
			if (this.attributes.id) {
				validator = this.validForUpdate();

				if (this.passes()) {
					var servicePromise = Service.update(data.id, data);
				} else {
					console.log(this.errors)
					alert("There was an error updating this record, check your fields");
					return
				}
			} else {
				validator = this.validForCreation();
				updating = false;
				if (this.passes()) {
					var servicePromise = Service.create(data);
				} else {
					console.log(this.errors)
					alert("There was an error creating this record, check your fields");
					return
				}

			}

			servicePromise.then(data => {
					console.log(data);
					that.fill(data);
					if (updating) {
						that.onUpdate();
					} else {
						that.onCreate();
					}
				})
				.catch(err => {
					console.log(err);
				})

			return
		}

		throw "You have not defined a service for this model";
	}

	// update() {
	// 	var data = this.attributes;
	// 	var that = this;
	// 	if (this.Service && data.id) {
	// 		var Service = this.Service;

	// 		service_promise.then(data => {
	// 				console.log(data);
	// 			})
	// 			.catch(err => {
	// 				console.log("Error: ", err);
	// 			})

	// 		return
	// 	}

	// 	throw "You have not defined a service for this model";
	// }
}

export
default Model;