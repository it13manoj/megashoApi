const connection = require("../database/connection");
module.exports = class Products {
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
        const executeFind = `SELECT * FROM products ${this.setlimit}`;
        return connection.execute(executeFind);
    }

    static getProductList(){
        const executeFind = `SELECT p.*,c.name as cname,b.name as bname FROM products p inner join categories c on c._id = p.category_id inner join brand b on b.id = p.brand_id order by id desc`;
        return connection.execute(executeFind);
    }

    static list(id){
        const executeFind = `SELECT p.*,c.name as cname,b.name as bname FROM products p inner join categories c on c._id = p.category_id inner join  brand b on b.id = p.brand_id where c._id = ${id} order by id desc`;
        return connection.execute(executeFind);
    }

    static findById(_id) {
        const executeFindById = `SELECT * FROM products WHERE _id = ?`;
        return connection.execute(executeFindById, [_id]);
    }

    create() {
        const executeCreate = `INSERT INTO products(category_id, name, description, price, discount, url, imageurl,brand_id) VALUES (?, ?, ?,?, ?, ?, ?, ?)`;
        return connection.execute(executeCreate, [this.parameter.categoryId,this.parameter.name,this.parameter.description,this.parameter.price,this.parameter.discount,this.parameter.url, this.parameter.imageurl, this.parameter.barnd]);
      
    }

    edit() {
        console.log(this.parameter.heading,this.parameter.description,this.parameter.status,this.parameter.images,this.id)
        const executeEdit = `UPDATE home SET  category_id=?, name=?, title=?, description=?, price=?, discount=?, images=?, status=?, url=?, brand_id=? WHERE id = ?`;
        return connection.execute(executeEdit,[this.parameter.heading,this.parameter.description,this.parameter.status,this.parameter.images,this.id]);
    }

    delete(_id) {
        const executeDelete = `DELETE FROM home WHERE id = ?`;
        return connection.execute(executeDelete, [_id]);
    }
}