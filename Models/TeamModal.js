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
        const executeFind = `SELECT * FROM teamprofile ${this.setlimit}`;
        return connection.execute(executeFind);
    }

    static findById(_id) {
        const executeFindById = `SELECT id, name, profile, images, status, descriptions FROM teamprofile WHERE id = ?`;
        return connection.execute(executeFindById, [_id]);
    }

    create() {
        const executeCreate = `INSERT INTO teamprofile(name, profile, images, status, descriptions) VALUES (?, ?, ?, ?, ?)`;
        return connection.execute(executeCreate, [this.parameter.name,this.parameter.profile,this.parameter.images,this.parameter.status,this.parameter.description]);
    }

    edit() {
        const executeEdit = `UPDATE teamprofile SET name=?, profile=?, images=?, status=?, descriptions=? WHERE id = ?`;
        return connection.execute(executeEdit,[this.parameter.name,this.parameter.profile,this.parameter.images,this.parameter.status,this.parameter.description,this.id]);
    }

    delete(_id) {
        const executeDelete = `DELETE FROM teamprofile WHERE id = ?`;
        return connection.execute(executeDelete, [_id]);
    }
}