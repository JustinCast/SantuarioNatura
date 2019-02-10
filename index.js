const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

var secure = require('ssl-express-www');
app.use(secure);

var multer = require("multer");
const fs = require('fs');

var DIR = "./server/public/images/";

const api = require("./server/routes/api");

/**
 * Server config
 */
function config() {
  app.use(bodyParser.urlencoded({ extended: true, limit: "50MB" }));
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
}

/**
 * Endpoints Config
 */
function routerConfig() {
  app.use(express.static(__dirname + "/dist/SantuarioNatura"));

  app.use("/api/v1", api);
  app.use(express.static("./server/public"));
  app.use('/static', express.static(path.join(__dirname, './server/public')));

  // Send all requests to index.html
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname + "/dist/SantuarioNatura/index.html"));
  });

  var storage = multer.diskStorage({
    //multers disk storage settings
    destination: function(req, file, cb) {
      cb(null, DIR);
    },
    filename: function(req, file, cb) {
      var datetimestamp = Date.now();
      cb(
        null,
        file.fieldname +
          "-" +
          datetimestamp +
          "." +
          file.originalname.split(".")[file.originalname.split(".").length - 1]
      );
    }
  });

  var upload = multer({
    //multer settings
    storage: storage
  }).single("file");
  app.post("/api/v1/upload", function(req, res) {
    upload(req, res, function(err) {
      if (err) {
        res.json({ error_code: 1, err_desc: err });
        return;
      }
      res.json(req.file);
    });
  });
  app.delete("/api/v1/deleteImageResource", function (req, res) {
    fs.unlink(req.body.path, function name(err) {
      if(err) return console.log(err);
      res.status(200).send(true);
    });
  });
}

// functions invocations
config();
routerConfig();

//Set Port
app.listen(process.env.PORT || 5000);
