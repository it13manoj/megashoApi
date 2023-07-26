const UserModel = require('../Models/Products')
const CategoriesModel = require("../Models/Category")
const helper = require('../Helpers/Helpers')
const responseHelper = require('../Helpers/Response')


exports.find = (Request, Response) => {
    let { limit, page } = Request.params;
    let uM = new UserModel(null, null, limit = null, page = null)
    uM.find().then(([uMR]) => {
        responseHelper[200].data = uMR;
        responseHelper[200].currentPage = page;
        Response.send(responseHelper[200]);
    }).catch(deptError => {
        sendError(Response, deptError);
    });
}
exports.list = async  (Request, Response) => {
    let catModal = new CategoriesModel();

    const initialResponse = await catModal.find().then(([e])=>{return e})
    const initialData = initialResponse
    let array =[];

    const nestedDataPromises = initialData.map(async (item) => {
        const nestedResponse = await UserModel.list(item._id).then(([e])=>{return e}) ;
        // const nestedData = nestedResponse;
        // console.log(nestedResponse)
       
        return {
            initialItem: item,
            nestedItem: nestedResponse
          };
         
        });

        const nestedData = await Promise.all(nestedDataPromises);

        responseHelper[200].data = nestedData;
        Response.send(responseHelper[200]);


    // UserModel.list(category_id).then(([uMR]) => {
    //     responseHelper[200].data = uMR;
    //     Response.send(responseHelper[200]);
    // }).catch(deptError => {
    //     sendError(Response, deptError);
    // });
}


exports.getProducts = (Request, Response) => {
    UserModel.getProductList().then(([uMR]) => {
        responseHelper[200].data = uMR;
        Response.send(responseHelper[200]);
    }).catch(deptError => {
        sendError(Response, deptError);
    });
}

exports.findById = (Request, Response) => {
    const {_id } = Request.body;
    UserModel.findById(_id).then(([uMR]) => {
        responseHelper[200].data = uMR;
        Response.send(responseHelper[200]);
    }).catch(campaignError => {
        sendError(Response, campaignError);
    });
}

exports.create = (Request, Response) => {
    const requestBody = Request.body;
    const uM = new UserModel(requestBody, null, null, null);
    uM.create().then(uMR => {
        Response.send(responseHelper[200]);
    }).catch(uMError => {
        sendError(Response, uMError);
    });
}

exports.edit = (Request, Response) => {
    const _id = Request.params.hid;
    const requestBody = Request.body;
    requestBody.images = requestBody.fileName != undefined ? requestBody.fileName : null
    const uMe = new UserModel(requestBody, _id, null, null);
    uMe.edit().then(edituMR => {
        Response.send(responseHelper[200]);
    }).catch(uMeError => {
        sendError(Response, uMeError);
    });
}

exports.delete = (Request, Response) => {
    const _id = Request.params.deptId;
    const uMd = new UserModel(null, null);
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