const UserModel = require('../Models/TeamModal')
const helper = require('../Helpers/Helpers')
const responseHelper = require('../Helpers/Response')


exports.find = (Request, Response) => {
    let { limit, page } = Request.params;
    let uM = new UserModel(null,null,limit=null, page=null)
    uM.find().then(([uMR]) => {
        responseHelper[200].data = uMR;
        responseHelper[200].currentPage = page;
        Response.send(responseHelper[200]);
    }).catch(deptError => {
        sendError(Response, deptError);
    });
}

exports.findById = (Request, Response) => {
    const _id = Request.body.id;
    UserModel.findById(_id).then(([uMR]) => {
        responseHelper[200].data = uMR;
        Response.send(responseHelper[200]);
    }).catch(campaignError => {
        sendError(Response, campaignError);
    });
}

exports.create = (Request, Response) => {
    const requestBody = Request.body; 
    requestBody.images= requestBody.fileName != undefined ? requestBody.fileName : null
    const uM = new UserModel(requestBody,null,null,null);
    uM.create().then(uMR => {
        Response.send(responseHelper[200]);
    }).catch(uMError => {
        sendError(Response, uMError);
    });
}

exports.edit = (Request, Response) => {
    const _id = Request.params.tid;
    const requestBody = Request.body; 
    requestBody.images= requestBody.fileName != undefined ? requestBody.fileName : null
    const uMe = new UserModel(requestBody,_id,null,null);
    uMe.edit().then(edituMR => {
        Response.send(responseHelper[200]);
    }).catch(uMeError => {
        sendError(Response, uMeError);
    });
}

exports.delete = (Request, Response) => {
    const _id = Request.params.deptId;
    const uMd = new UserModel(null,null);
    uMd.delete(_id).then(deleteCampaignResponse => {
        Response.send(responseHelper[200]);
    }).catch(uMdError => {
        sendError(Response, uMdError);
    });
}

const sendError = (Response, Error) => {
    if (Error.errno === 500) {
        responseHelper[500].data = [];
        Response.send(responseHelper[500]);
    } else {
        const errorObj = {};
        errorObj.status = Error.errno;
        errorObj.message = Error.sqlMessage ? Error.sqlMessage : Error.code;
        errorObj.hasError = true;
        errorObj.data = Error.sql;
        Response.send(errorObj);
    }
}