"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var UserModel = require('../Models/PortfolioModal');

var helper = require('../Helpers/Helpers');

var responseHelper = require('../Helpers/Response');

exports.find = function (Request, Response) {
  var _Request$params = Request.params,
      limit = _Request$params.limit,
      page = _Request$params.page;
  var uM = new UserModel(null, null, limit = null, page = null);
  uM.find().then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
        uMR = _ref2[0];

    responseHelper[200].data = uMR;
    responseHelper[200].currentPage = page;
    Response.send(responseHelper[200]);
  })["catch"](function (deptError) {
    sendError(Response, deptError);
  });
};

exports.findById = function (Request, Response) {
  var _id = Request.body.id;
  UserModel.findById(_id).then(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 1),
        uMR = _ref4[0];

    responseHelper[200].data = uMR;
    Response.send(responseHelper[200]);
  })["catch"](function (campaignError) {
    sendError(Response, campaignError);
  });
};

exports.findByType = function (Request, Response) {
  var status = Request.body.status;
  UserModel.findByType(status).then(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 1),
        uMR = _ref6[0];

    responseHelper[200].data = uMR;
    Response.send(responseHelper[200]);
  })["catch"](function (campaignError) {
    sendError(Response, campaignError);
  });
};

exports.groupByType = function (Request, Response) {
  UserModel.groupByType().then(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 1),
        uMR = _ref8[0];

    responseHelper[200].data = uMR;
    Response.send(responseHelper[200]);
  })["catch"](function (campaignError) {
    sendError(Response, campaignError);
  });
};

exports.create = function (Request, Response) {
  var requestBody = Request.body;
  requestBody.images = requestBody.fileName != undefined ? requestBody.fileName : null; // requestBody.small_icon= requestBody.fileName != undefined ? "thumb_"+requestBody.fileName : null

  var uM = new UserModel(requestBody, null, null, null);
  uM.create().then(function (uMR) {
    Response.send(responseHelper[200]);
  })["catch"](function (uMError) {
    sendError(Response, uMError);
  });
};

exports.edit = function (Request, Response) {
  var _id = Request.params.id;
  var requestBody = Request.body;
  requestBody.images = requestBody.fileName != undefined ? requestBody.fileName : null;
  var uMe = new UserModel(requestBody, _id, null, null);
  uMe.edit().then(function (edituMR) {
    Response.send(responseHelper[200]);
  })["catch"](function (uMeError) {
    sendError(Response, uMeError);
  });
};

exports["delete"] = function (Request, Response) {
  var _id = Request.params.deptId;
  var uMd = new UserModel(null, null);
  uMd["delete"](_id).then(function (deleteCampaignResponse) {
    Response.send(responseHelper[200]);
  })["catch"](function (uMdError) {
    sendError(Response, uMdError);
  });
};

var sendError = function sendError(Response, Error) {
  if (Error.errno === 500) {
    responseHelper[500].data = [];
    Response.send(responseHelper[500]);
  } else {
    var errorObj = {};
    errorObj.status = Error.errno;
    errorObj.message = Error.sqlMessage ? Error.sqlMessage : Error.code;
    errorObj.hasError = true;
    errorObj.data = Error.sql;
    Response.send(errorObj);
  }
};