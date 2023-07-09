require("dotenv").config();
const express = require("express");
const https = require("https");
const http = require("http");
const cors = require("cors");
const bodyParser = require('body-parser')
const app = express();
const hostname ='127.0.0.1';
const { NODE_ENV, PORT } = process.env;

// ----------------------------------Router -----------------------------------

// const userRouter = require('./Routers/Users');
const pRouter = require('./Routers/Products');
const cRouter = require('./Routers/Category');
// const sRouter = require('./Routers/Services');
const bRouter = require('./Routers/Brand');
// const tRouter = require('./Routers/Team');


const table = require('./Scamea/Tables');



app.use(cors({
    origin: "*"
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Credentials', true);
        return res.status(200).json({});
    }
    next();
});
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb', extended: true}));

app.use('/api/product/v1',pRouter)
app.use('/api/categories/v1',cRouter)
// app.use('/api/service/v1',sRouter)
app.use('/api/brand/v1',bRouter)
// app.use('/api/team/v1',tRouter)
// app.use('/api/users/v1',userRouter)
// app.use('/api/table',table.role);

app.use(express.static(__dirname + '/Uploads'));
app.use('/uploads', express.static('Uploads'));







if (NODE_ENV === "development" || NODE_ENV === "staging") {
    http.createServer(app).listen(PORT, hostname,() => {
        console.log(`App listening on port ${PORT}`);
    });
} else {
    var options = {
        // key: fs.readFileSync('/etc/ssl/corptax/private.key'),
        // cert: fs.readFileSync('/etc/ssl/corptax/corptax.bundle')
    };
    https.createServer(options, app).listen(PORT,hostname, () => {
        console.log(`App listening on port ${PORT}`);
    });
}