import Vue from 'vue';
import Service from './Service.js';
//import UserModel from '../models/UserModel.js';

class User extends Service {
	constructor() {
		super();
		this.config.prefix = '/admin/';
		//this.model = UserModel;
		// this.config.endpointUrl = 'store-requests/';
	}


}
export default User;