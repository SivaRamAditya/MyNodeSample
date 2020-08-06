var { json, urlencoded } = require("body-parser");
var http = require("http");
var cors = require("cors");
var multer = require("multer");
var express = require("express");
var upload = multer();
var app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(upload.array());
require("./routes/routes")(app);
require("./routes/sample")(app);
http.createServer(app).listen(8080);
