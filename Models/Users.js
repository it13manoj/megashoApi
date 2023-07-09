const db = require('../database/connection')
const table= require('../Utils/Constants');

module.exports = class Users {
	constructor(data, _id) {
		this.parameter = data
		this._id = _id
	}

	static find() {
		const findUsers = `select id,name,email from 1110101 where 0= ?`
		return db.execute(findUsers, [0]);
	}

	static login(email) {
		const findUsers = 'select * from `1110101` where email= ?'
		return db.execute(findUsers, [email]);
	}

	findById() {

	}

	create() {
		console.log(this.parameter);
		const executeCreate = `INSERT INTO ${table.User} (name, contact, email, password) VALUES (?, ?, ?, ?)`;
        return db.execute(executeCreate, [this.parameter.name,this.parameter.contact,this.parameter.email,this.parameter.password]);
	}

	edit() {

	}

	delete() {

	}
}