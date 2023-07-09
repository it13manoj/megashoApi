const connection = require("../database/connection");
module.exports = class Category {
    constructor(data,_id,lt,pg) {
        this.limit = lt || 20;
        this.page = pg || 1;        
        this.offset = (pg - 1) * lt;
        this.parameter = data
        this.id = _id
    }

     find() {
        const executeFind = `SELECT * FROM categories`;
        return connection.execute(executeFind);
    }

    static findById(_id) {
        const executeFindById = `SELECT * FROM categories WHERE _id = ?`;
        return connection.execute(executeFindById, [_id]);
    }

    create() {
        const executeCreate = `INSERT INTO categories(name) VALUES (?)`;
        return connection.execute(executeCreate, [this.parameter.name]);
    }

    edit() {
        console.log(this.parameter.description,this.parameter.images,this.parameter.status,this.id);
        const executeEdit = `UPDATE categories SET name = ? , images = ? WHERE _id = ?`;
        return connection.execute(executeEdit,[this.parameter.description,this.parameter.images,this.parameter.status,this.id]);
    }

    delete(_id) {
        const executeDelete = `DELETE FROM categories WHERE _id = ?`;
        return connection.execute(executeDelete, [_id]);
    }
}