"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var express = require("express");

var Routes = express.Router();

var pController = require("../Controllers/PortfolioController");

var fs = require('fs');

var resizeImg = require('resize-img');

var multer = require('multer');

var pModel = require('../Models/PortfolioModal');

var imageStorage = multer.diskStorage({
  destination: 'uploads/',
  filename: function filename(req, file, cb) {
    var fileExt = file.originalname.split('.').pop(); //console.log(req.body,file);

    var fileName = Date.now() + '.' + fileExt;
    req.body.fileName = fileName;
    cb(null, fileName);
  }
});
var imageUpload = multer({
  storage: imageStorage,
  fileFilter: function fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|svg)$/)) {
      return cb(new Error('Please upload a Image'));
    }

    cb(undefined, true);
  }
});

var resize = function resize(req, res, next) {
  var olddata;
  return regeneratorRuntime.async(function resize$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(req.file == undefined && req.body.old_filename)) {
            _context.next = 7;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(pModel.findById(req.params.partnerId).then(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 1),
                result = _ref2[0];

            var fileNames = result[0].large_icon.split('.').pop();
            var imagedata = Date.now() + '.' + fileNames;

            if (fs.existsSync("uploads/" + result[0].large_icon)) {
              console.log("working");
              fs.renameSync("uploads/" + result[0].large_icon, "uploads/" + imagedata);
            }
          }));

        case 3:
          olddata = _context.sent;
          next();
          _context.next = 8;
          break;

        case 7:
          // let imagedata = Date.now();
          // const image = await resizeImg(fs.readFileSync("uploads/" + imagedata), {
          //     width: 80,
          //     height: 80
          // });
          next();

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
};

Routes.get("/find/:limit?/:page?", pController.find);
Routes.post("/findById", pController.findById);
Routes.post("/findByType", pController.findByType);
Routes.post("/groupByType/:pid?", pController.groupByType);
Routes.post("/create", imageUpload.single('image'), resize, pController.create);
Routes.put("/edit/:pid", imageUpload.single('image'), resize, pController.edit);
Routes["delete"]("/delete/:pid", pController["delete"]);
module.exports = Routes;