const express = require("express");
const Routes = express.Router();
const tController = require("../Controllers/TeamControlle");
const fs = require('fs');
const resizeImg = require('resize-img')
const multer = require('multer')
const tModel = require('../Models/TeamModal')


const imageStorage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        var fileExt = file.originalname.split('.').pop();
        //console.log(req.body,file);
        let fileName = Date.now()+ '.' + fileExt;
        req.body.fileName = fileName;
        cb(null, fileName)
    }
});

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg|svg)$/)) {
            return cb(new Error('Please upload a Image'))
        }
        cb(undefined, true)
    }
})

const resize = async (req, res, next) => {
    if (req.file == undefined && req.body.old_filename) {
        let olddata = await tModel.findById(req.params.partnerId).then(([result]) => {
            const fileNames = result[0].large_icon.split('.').pop();

            let imagedata = Date.now()+ '.' + fileNames
            if (fs.existsSync("uploads/" + result[0].large_icon)) {
                console.log("working")
                fs.renameSync("uploads/" + result[0].large_icon, "uploads/" + imagedata);
            }

        });
        next()
    } else {
        next();
    }
}






Routes.get("/find/:limit?/:page?", tController.find);
Routes.post("/findById", tController.findById);
Routes.post("/create",imageUpload.single('image'), resize,  tController.create);
Routes.put("/edit/:tid", imageUpload.single('image'), resize, tController.edit);
Routes.delete("/delete/:hid", tController.delete);

module.exports = Routes;