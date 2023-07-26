const express = require("express");
const Routes = express.Router();
const uController = require("../Controllers/ProductsController");
const fs = require('fs');
// const resizeImg = require('resize-img')
// const multer = require('multer')
// const partnerModel = require('../Models/HomeModal')


// const imageStorage = multer.diskStorage({
//     destination: 'uploads/',
//     filename: (req, file, cb) => {
//         var fileExt = file.originalname.split('.').pop();
//         //console.log(req.body,file);
//         let fileName = Date.now()+ '.' + fileExt;
//         req.body.fileName = fileName;
//         cb(null, fileName)
//     }
// });

// const imageUpload = multer({
//     storage: imageStorage,
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(png|jpg|svg)$/)) {
//             return cb(new Error('Please upload a Image'))
//         }
//         cb(undefined, true)
//     }
// })

// const resize = async (req, res, next) => {
//     if (req.file == undefined && req.body.old_filename) {
//         let olddata = await partnerModel.findById(req.params.partnerId).then(([result]) => {
//             const fileNames = result[0].large_icon.split('.').pop();

//             let imagedata = Date.now()+ '.' + fileNames
//             if (fs.existsSync("uploads/" + result[0].large_icon)) {
//                 console.log("working")
//                 fs.renameSync("uploads/" + result[0].large_icon, "uploads/" + imagedata);
//             }

//         });
//         next()
//     } else {
//         // let imagedata = Date.now();
//         // const image = await resizeImg(fs.readFileSync("uploads/" + imagedata), {
//         //     width: 80,
//         //     height: 80
//         // });
//         next();
//     }
// }






Routes.get("/find/:limit?/:page?", uController.find);
Routes.post("/list/:limit?/:page?", uController.list);
Routes.post("/getProducts", uController.getProducts);
Routes.post("/create",  uController.create);
Routes.put("/edit/:hid", uController.edit);
Routes.delete("/delete/:hid", uController.delete);
Routes.post("/findbyId", uController.findById);

module.exports = Routes;