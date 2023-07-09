const connection = require("../database/connection");
module.exports = class Home {
    constructor(data,_id,lt,pg) {
        this.limit = lt || 20;
        this.page = pg || 1;        
        this.offset = (pg - 1) * lt;
        this.parameter = data
        this.id = _id
    }

     find() {
         if(this.limit !=null){
            this.setlimit =`limit ${this.limit} offset ${this.offset}`;
         }else{
             this.setlimit = '';
         }
        const executeFind = `SELECT * FROM services ${this.setlimit}`;
        return connection.execute(executeFind);
    }

    static findById(_id) {
        const executeFindById = `SELECT id, description, images, status, types FROM services WHERE types = ?`;
        return connection.execute(executeFindById, [_id]);
    }

    create() {
        const executeCreate = `INSERT INTO services(description, images, status, types) VALUES (?, ?, ?, ?)`;
        return connection.execute(executeCreate, [this.parameter.description,this.parameter.images,this.parameter.status,this.parameter.types]);
    }

    edit() {
        const executeEdit = `UPDATE services SET description = ? , images = ?, status = ? WHERE id = ?`;
        return connection.execute(executeEdit,[this.parameter.description,this.parameter.images,this.parameter.status,this.id]);
    }

    delete(_id) {
        const executeDelete = `DELETE FROM services WHERE id = ?`;
        return connection.execute(executeDelete, [_id]);
    }
}