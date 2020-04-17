var express = require("express");
var mongoose = require("mongoose");
// var axios = require("axios");
// var cheerio = require("cheerio");
const Handlebars = require('handlebars')

var exphbs = require("express-handlebars");
var logger = require("morgan");
mongoose.connect("mongodb://localhost/MongoScraper", { useNewUrlParser: true });
var mongoose = require("mongoose");
// var db = require("./models");

var PORT = process.env.PORT || 8080;

// app.use(logger("dev"));

var app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// var routes = require("./controllers/htmlRoutes");

app.use(require("./routes/htmlRoutes.js"));
// app.use(require("./scripts/scrape.js"));

const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
 
// const app = express();
 
app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

// app.use(logger("dev"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// // Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});

