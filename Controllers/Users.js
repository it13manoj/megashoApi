const UserModel = require("../Models/Users");
const responseHelper = require("../helpers/Response");
const apiHelper = require("../helpers/API");
const { encrypt, decrypt, generateJWT } = require("../helpers/Helpers");
const { PRIVATE_KEY } = process.env


exports.index = (Request, Response) => {
    const { limit, page } = Request.params
    UserModel.find(limit, page).then(([userResponse]) => {
        responseHelper[200].data = userResponse;
        responseHelper[200].currentPage = page
        Response.send(responseHelper[200]);
    }).catch(userError => {
        sendError(Response, userError);
    });
}

exports.findById = (Request, Response) => {
    const userId = Request.params.userId;
    UserModel.findById(userId).then(([userResponse]) => {
        responseHelper[200].data = userResponse;
        Response.send(responseHelper[200]);
    }).catch(userError => {
        sendError(Response, userError);
    });
}

exports.login = (Request, Response) => {
    console.log("Here")
   /*  const { email, password } = Request.body;
    console.log(Request.body) */
   /*  if (email) {
        UserModel.login(email).then(([userLoginResponse]) => {
            let data;
            if (userLoginResponse.length > 0) {
                const jwtToken = generateJWT(userLoginResponse[0].email, userLoginResponse[0].name, userLoginResponse[0].contact);
                userLoginResponse[0].accessToken = jwtToken           
                if (password === decrypt(userLoginResponse[0].password)) {
                    delete userLoginResponse[0].password;
                    data = userLoginResponse;
                } else {
                    Response.send(responseHelper[401]);
                    return;
                }
            } else {
                data = [];
            }
            responseHelper[200].data = data;
            Response.send(responseHelper[200]);
        }).catch(userLoginError => {
            sendError(Response, userLoginError);
        })
    } else {
        Response.send(responseHelper[204]);
    } */
}

exports.create = (Request, Response) => {
    const { password, confirm_password } = Request.body
    Request.body.password = encrypt(password)
    Request.body.confirm_password = encrypt(confirm_password)
    Request.body.roles = 0
    console.log(Request.body)
    const userCreate = new UserModel(Request.body,null);
    userCreate.create().then(([userCreateResponse]) => {
        Response.send(responseHelper[200]);
    }).catch(userCreateError => {
        sendError(Response, userCreateError);
    });
}

exports.edit = (Request, Response) => {
    if (!!Request.body) {
        const { password, confirm_password } = Request.body
        const userId = Request.params.userId;
        Request.body.password = encrypt(password)
        Request.body.confirm_password = encrypt(confirm_password)
        const userEdit = new UserModel(userId, Request.body);
        userEdit.edit().then(([userEditResponse]) => {
            Response.send(responseHelper[200]);
        }).catch(userEditError => {
            sendError(Response, userEditError);
        });
    } else {
        Response.send({ status: 400, message: "MISSING_BODY", data: "Please provide some body.", hasError: true });
    }
}

exports.delete = (Request, Response) => {
    const userId = Request.params.userId;

    UserModel.delete(userId).then(([userDeleteResponse]) => {
        Response.send(responseHelper[200]);
    }).catch((userDeleteError) => {
        sendError(Response, userDeleteError);
    })
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