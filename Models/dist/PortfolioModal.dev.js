"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var connection = require("../database/connection");

module.exports =
/*#__PURE__*/
function () {
  function Home(data, _id, lt, pg) {
    _classCallCheck(this, Home);

    this.limit = lt || 20;
    this.page = pg || 1;
    this.offset = (pg - 1) * lt;
    this.parameter = data;
    this.id = _id;
  }

  _createClass(Home, [{
    key: "find",
    value: function find() {
      if (this.limit != null) {
        this.setlimit = "limit ".concat(this.limit, " offset ").concat(this.offset);
      } else {
        this.setlimit = '';
      }

      var executeFind = "SELECT * FROM portfolio ".concat(this.setlimit);
      return connection.execute(executeFind);
    }
  }, {
    key: "create",
    value: function create() {
      var executeCreate = "INSERT INTO portfolio(description, images, status, link) VALUES (?, ?, ?, ?)";
      return connection.execute(executeCreate, [this.parameter.description, this.parameter.images, this.parameter.status, this.parameter.link]);
    }
  }, {
    key: "edit",
    value: function edit() {
      var executeEdit = "UPDATE portfolio SET description = ? , images = ?, status = ?, link=?  WHERE id = ?";
      return connection.execute(executeEdit, [this.parameter.description, this.parameter.images, this.parameter.status, this.parameter.link, this._id]);
    }
  }, {
    key: "delete",
    value: function _delete(_id) {
      var executeDelete = "DELETE FROM portfolio WHERE id = ?";
      return connection.execute(executeDelete, [_id]);
    }
  }], [{
    key: "findById",
    value: function findById(_id) {
      var executeFindById = "SELECT id, description, images, status, link FROM portfolio WHERE id = ?";
      return connection.execute(executeFindById, [_id]);
    }
  }, {
    key: "findByType",
    value: function findByType(status) {
      var executeFindById = "SELECT id, description, images, status, link FROM portfolio WHERE status = ?";
      return connection.execute(executeFindById, [status]);
    }
  }, {
    key: "groupByType",
    value: function groupByType(status) {
      var executeFindById = "SELECT status FROM portfolio group by status";
      return connection.execute(executeFindById);
    }
  }]);

  return Home;
}();