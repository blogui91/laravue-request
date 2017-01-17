import Model from '../models/Model.js';
import PostService from '../services/PostService';
class Post extends Model {
	constructor(attributes = {}) {
		super();

		this.attributes = {
			id: null,
			title: null,
			description: null,
			user_id: '',
		};

		this.rulesForCreation = {
			title: 'required',
			description: 'required'
		}

		this.messages = {
			title: {
				required: 'Debes escribir un titulo',
				alpha: "Solo valores alfanumericos",
				email: "El campo email es requerido"
			},
			description: {
				required: 'Campo requerido',
				alpha: "SOlo letras"
			}

		};

		this.Service = new PostService();
		this.fill(attributes);
	}

	onUpdate() {

	}

	onCreate() {
		this.edit = false;
		this.deleted = false;
	}

	set id(id) {
		this.attributes.id = id
	}

	get id() {
		return this.attributes.id
	}

	set title(title) {
		this.attributes.title = title
	}

	set user_id(user_id) {
		this.attributes.user_id = user_id
	}

	get user_id() {
		return this.attributes.user_id
	}

	get title() {
		return this.attributes.title
	}

	set description(description) {
		this.attributes.description = description
	}

	get description() {
		return this.attributes.description
	}



}

export default Post;