const connection = require("../database/connection");
const ts = require('../Utils/Constants');
module.exports = class Tables{
		static role (){
			const role = 'CREATE TABLE roles(_id int NOT NULL AUTO_INCREMENT,  role varchar(255) NOT NULL, status ENUM("0","1","2"), PRIMARY KEY (_id))';
			connection.execute(role);

			const user = `CREATE TABLE ${ts.User}(_id int NOT NULL AUTO_INCREMENT,name varchar(255) NOT NULL,email varchar(255) NOT NULL UNIQUE, password varchar(255) NOT NULL, role_d int NOT NULL, status ENUM("0","1","2"), PRIMARY KEY (_id),FOREIGN KEY (role_d) REFERENCES roles(_id))`;
			connection.execute(user);

			const address = `CREATE TABLE ${ts.Address}(_id int NOT NULL AUTO_INCREMENT,city varchar(255) NOT NULL,state varchar(255) NOT NULL, pin_code varchar(255) NOT NULL, user_id int NOT NULL,delivered varchar(255), status ENUM("0","1","2") COMMENT '1 for active, 2 for inactive, 0 for delete' , PRIMARY KEY (_id),FOREIGN KEY (user_id) REFERENCES ${ts.User}(_id))`;
			connection.execute(address);

			const category = `CREATE TABLE ${ts.Category}(_id int NOT NULL AUTO_INCREMENT,name varchar(255) NOT NULL, user_id int NOT NULL, status ENUM("0","1","2") COMMENT '1 for active, 2 for inactive, 0 for delete' , PRIMARY KEY (_id),FOREIGN KEY (user_id) REFERENCES ${ts.User}(_id))`;
			connection.execute(category);

			const brand = `CREATE TABLE ${ts.Brand}(_id int NOT NULL AUTO_INCREMENT,name varchar(255) NOT NULL,user_id int NOT NULL, status ENUM("0","1","2") COMMENT '1 for active, 2 for inactive, 0 for delete' , PRIMARY KEY (_id),FOREIGN KEY (user_id) REFERENCES ${ts.User}(_id))`;
			connection.execute(brand);

			const product = `CREATE TABLE ${ts.Product}(_id int NOT NULL AUTO_INCREMENT,name varchar(255) NOT NULL,title Text NOT NULL,price decimal NOT NULL,discount decimal NOT NULL,category_id int NOT NULL, brand_id int NOT NULL ,user_id int NOT NULL, status ENUM("0","1","2") COMMENT '1 for active, 2 for inactive, 0 for delete' , PRIMARY KEY (_id),FOREIGN KEY (user_id) REFERENCES ${ts.User}(_id)),FOREIGN KEY (category_id) REFERENCES ${ts.Category}(_id)),FOREIGN KEY (brand_id) REFERENCES ${ts.Brand}(_id))`;
			connection.execute(product);

			


			
		}
}