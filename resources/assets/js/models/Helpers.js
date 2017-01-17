export default {
	/**
	 * Check whether the field is blank.
	 *
	 * @param {String} value
	 * @return {Boolean}
	 */
	empty(value) {
		return value == null || value.length == 0 || value.trim() == '';
	},

	/**
	 * No blank fields.
	 *
	 * @param {String} value
	 * @return {Boolean}
	 */
	required(value) {
		if (typeof value == 'boolean')
			return value;

		return !this.empty(value);
	},

	/**
	 * Numeric rule.
	 *
	 * @param {String} value
	 * @return {Boolean}
	 */
	numeric(value) {
		return (/^-?(?:0$0(?=\d*\.)|[1-9]|0)\d*(\.\d+)?$/)
			.test(value);
	},

	/**
	 * Integer rule.
	 *
	 * @param {String} value
	 * @return {Boolean}
	 */
	integer(value) {
		return (/^(-?[1-9]\d*|0)$/)
			.test(value);
	},

	/**
	 * Digits rule.
	 *
	 * @param {String} value
	 * @return {Boolean}
	 */
	digits(value) {
		return (/^[\d() \.\:\-\+#]+$/)
			.test(value);
	},

	/**
	 * Alpha rule.
	 *
	 * @param {String} value
	 * @return {Boolean}
	 */
	alpha(value) {
		return (/^[a-zA-Z]+$/)
			.test(value);
	},

	/**
	 * Alpha num rule.
	 *
	 * @param {String} value
	 * @return {Boolean}
	 */
	alphaNum(value) {
		return !(/\W/)
			.test(value);
	},

	/**
	 * Emails rule.
	 *
	 * @param {String} value
	 * @return {Boolean}
	 */
	email(value) {
		return (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
			.test(value);
	},

	/**
	 * Url rule.
	 *
	 * @param {String} value
	 * @return {Boolean}
	 */
	url(value) {
		return (/^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i)
			.test(value);
	},

	/**
	 * Length rule.
	 *
	 * @param {String} value
	 * @return {Boolean}
	 */
	length(value) {
		return value && value.length == +arg;
	},

	/**
	 * Check whether the values has a blank value.
	 *
	 * @param {String} value
	 * @return {Boolean}
	 */
	blank(value) {
		return value && value.trim() !== "";
	},

	/**
	 * Check whether the values has IOS date format.
	 *
	 * @param {String} value
	 * @return {Boolean}
	 */
	dateISO(value) {
		return (/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/)
			.test(value);
	},

	/**
	 * Check whether a given value has a valid US phone number format.
	 *
	 * @param {String} value
	 * @return {Boolean}
	 */
	phone(value) {
		/*
		| ----------------------------------------------------------
		| VALID FORMATS
		| ----------------------------------------------------------
		|
		| 123-456-7890, (123) 456-7890, 123 456 7890
		| 123.456.7890, +91 (123) 456-7890
		|
		*/

		return (/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
			.test(value);
	},

	first(array = []) {
		if (array.constructor == Array) {
			if (array.length > 0) {
				return array[0];
			}
		}
		throw "Error getting first element, array is needed but we get " + array.constructor.name;
	}
}