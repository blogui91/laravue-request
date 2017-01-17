/**
 * Validator class
 * @author  Gustavo Ocanto <gustavoocanto@gmail.com>
 */

import Helpers from './Helpers.js';

class Validator {
	/**
	 * Create a new instance.
	 *
	 * @param {Object} data
	 * @param {Object} rules
	 * @param {Object} messages
	 */
	constructor(data, rules, messages) {
		//contains the validation errors.
		this.errors = {};

		//the data to be checked out.
		this.data = data;

		//the rules required.
		this.rules = rules;

		//Error messages container.
		this.messages = messages;
	}

	/**
	 * Create a new static instance.
	 *
	 * @param {Object} data
	 * @param {Object} rules
	 * @param {Object} messages
	 */
	static make(data, rules, messages) {
		let validate = new Validator(data, rules, messages);

		return validate.handle();
	}

	/**
	 * Walk through the validations rules.
	 *
	 * @returns {Object}
	 */
	handle() {
		let methods = null;

		for (let rule in this.rules) {
			methods = this.rules[rule].split(',');
			this.evaluate(methods, rule);
		}

		return this.errors;
	}

	/**
	 * Evaluate the input against rules.
	 *
	 * @param {Array} methods
	 * @param {String} field
	 * @returns {Array}
	 */
	evaluate(methods, field) {
		let value = this.data[field];

		//We return if the rule required does not exist and the field value is empty.
		if (this.isNotRequired(methods, value)) {
			return;
		}

		for (let method in methods) {
			//if the rule required exits and there was an error, the
			//stack errors method is called to keep track of rules
			//that did not pass the validation.

			//method index
			// methods rules
			var rule = methods[method];
			if (Helpers[rule] && !Helpers[rule](value)) {
				this.stackErrors({
					key: field, //evaluated field.
					error: this.messages[field][rule]
				});
			}
		}
	}

	/**
	 * Check whether a field is not required and has an empty value.
	 *
	 * @param {Array} methods
	 * @param {String} value
	 * @return {Boolean}
	 */
	isNotRequired(methods, value) {
		//if the rule required does not exist and the field value is empty.
		if ((methods.indexOf('required') === -1) && this.empty(value)) {
			return true;
		}

		return false;
	}

	/**
	 * Keep errors tracked out.
	 *
	 * @param {Object} data
	 * @return {Void}
	 */
	stackErrors(data) {
		if (typeof this.errors[data.key] == 'undefined') {
			this.errors[data.key] = [];
		}
		if (this.errors[data.key].indexOf(data.error) == -1) {
			this.errors[data.key].push(data.error);
		}
	}


}

export default Validator;