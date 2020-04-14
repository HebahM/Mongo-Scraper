var express = require("express");
var app = express.Router();
var scrape = require("../scripts/scrape.js")
var mongoose = require("mongoose");
var db = require("../models");


app.get("/", async function(req, res){

    console.log("INIDE GET first")
    await db.Article.find({ saved: false })
    .then(function(dbArticle) {
      var obj = {
        data: dbArticle
    }
    console.log("inside call back get route")
    // console.log("console log from get '/'......")
    // console.log(obj);
    res.render("index", obj)

    })
    // res.render("index")
})

app.get("/saved", function(req, res){
    db.Article.find({ saved: true })
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
    //   res.json(dbArticle);
      var obj = {
        data: dbArticle
    }
    console.log("console.log from .get /saved ................")
    //console.log(obj);
    res.render("index", obj)

    })
    // res.render("index")
})

app.get("/scrape", async function(req, res) {
    console.log("hiting post rount now")
    let x = await scrape();

    
    console.log(x)
    // db.Article.find({})
    // .then(function(dbArticle) {
    //   // If we were able to successfully find Articles, send them back to the client
    // console.log("INISE CALLback")
    //   //res.redirect("/");
    // })
    console.log("DONE-----------")
})

app.post("/saved", function(req, res) {
    db.Article.findByIdAndUpdate((req.body.id),(req.body.saved))
    .then(function(data){
        console.log(data)
        console.log("updated")
    })
    .catch(function(err){
        console.log(err)
    })
});
// app.get("/scrape", function (req, res) {
//     console.log("works")
//     // console.log(scrape())
//     scrape();
//     db.Article.find({})
//     .then(function(dbArticle) {
//       // If we were able to successfully find Articles, send them back to the client
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//     });
//     // .then(function(data) {
//     //     res.json(data)
//     // })
// })

module.exports = app