require("dotenv").config();

let express = require("express");
let app = express();

let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app
  .get("/", function (req, res) {
    res.sendFile(__dirname + "/views/index.html");
  })
  .get(
    "/now",
    function (req, res, next) {
      req.time = new Date().toString();
      next();
    },
    function (req, res) {
      res.json({ time: req.time });
    }
  )
  .get("/:word/echo", function (req, res) {
    res.json({ echo: req.params.word });
  })
  .get("/json", function (req, res) {
    if (process.env.MESSAGE_STYLE === "uppercase") {
      res.json({ message: "HELLO JSON" });
    } else {
      res.json({ message: "Hello json" });
    }
  })
  .get("/name", function (req, res) {
    res.json({ name: req.query.first + " " + req.query.last });
  })
  .post("/name", function (req, res) {
    res.json({ name: req.body.first + " " + req.body.last });
  });

// app.get("/", function (req, res) {
//   res.send("Hello Express");
// });

app.use("/public", express.static(__dirname + "/public"));

module.exports = app;
