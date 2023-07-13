const connection = require("../database/connection");
module.exports = class Brand {
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
        const executeFind = `SELECT * FROM brand ${this.setlimit}`;
        return connection.execute(executeFind);
    }

    static findById(_id) {
        const executeFindById = `SELECT * FROM brand WHERE id = ?`;
        return connection.execute(executeFindById, [_id]);
    }

    static findByType(status) {
        const executeFindById = `SELECT * FROM brand WHERE status = ?`;
        return connection.execute(executeFindById, [status]);
    }

    static groupByType(status) {
        const executeFindById = `SELECT status FROM portfolio group by status`;
        return connection.execute(executeFindById);
    }

    create() {
        console.log(this.parameter.name,this.parameter.categoryId)
        const executeCreate = `INSERT INTO brand(name, category_id) VALUES (?, ?)`;
        return connection.execute(executeCreate, [this.parameter.name,this.parameter.categoryId]);
    }

    static findCatBrand(){
        const executeFind = `SELECT b.id as bid,c._id as cid,b.name as bName,c.name as catName FROM brand b inner join categories c on c._id = b.category_id order by b.id desc`;
        return connection.execute(executeFind);
    }

    edit() {
        const executeEdit = `UPDATE portfolio SET description = ? , images = ?, status = ?, link=?  WHERE id = ?`;
        return connection.execute(executeEdit,[this.parameter.description,this.parameter.images,this.parameter.status,this.parameter.link,this._id]);
    }

    delete(_id) {
        const executeDelete = `DELETE FROM portfolio WHERE id = ?`;
        return connection.execute(executeDelete, [_id]);
    }
}