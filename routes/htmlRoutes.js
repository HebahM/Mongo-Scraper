var express = require("express");
var app = express.Router();
var scrape = require("../scripts/scrape.js")
var mongoose = require("mongoose");
var db = require("../models");


// app.get("/scrape",  async function(req, res) {
//     let x =  await scrape();
//    console.log("++++")
//    console.log(x[0][0])
//    console.log("++++")
//    // db.Article.find({})
//    // .then(function(dbArticle) {
//    //   // If we were able to successfully find Articles, send them back to the client
//    // console.log("INISE CALLback")
//    //   //res.redirect("/");
//    // })
//    res.render("index", x[0][0])

// })


app.get("/", async function (req, res) {

    console.log("INIDE GET first")
    db.Article.find({ saved: false })
        .then(function (dbArticle) {
            var obj = {
                data: dbArticle
            }
            console.log("inside call back get route")
            res.render("index", obj)
        })
    // res.render("index")
})

app.get("/saved", function (req, res) {
    db.Article.find({ saved: true })
        .populate("note")
        .then(function (dbArticle) {
            // If we were able to successfully find Articles, send them back to the client
            //   res.json(dbArticle);
            var obj = {
                data: dbArticle
            }
            console.log("console.log from .get /saved ................")
            //console.log(obj);
            res.render("saved", obj)

        })
    // res.render("index")
})

app.get("/scrape", async function (req, res) {
    console.log("hiting post rount now")
    // let x = await scrape();
    scrape();
    // console.log(x)
    db.Article.find({})
        .then(function (dbArticle) {
            var obj = {
                data: dbArticle
            }
            // If we were able to successfully find Articles, send them back to the client
            console.log("INSIDE CALLback")
            res.render("index", obj);
        })

    // console.log("DONE-----------")
    // res.render("index", x[0][0])
})

app.post("/saved", function (req, res) {
    db.Article.findOneAndUpdate({ _id: req.body.id }, { saved: req.body.saved }, { new: true })
        .then(function (data) {
            console.log(data)
            console.log("updated")
        })
        .catch(function (err) {
            console.log(err)
        })
});

app.post("/articles/:id", function (req, res) {
    console.log("req.body for notes")
    console.log(req.body)
    console.log("req.body for notes")
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
})

app.delete("/articles", function (req, res) {
    console.log("route for delete button was hit")
    db.Article.deleteMany({})
        .then(function () {
            db.Note.deleteMany({})
                .then(function () {
                    return res.redirect("/")
                })
        })
})

app.delete("/notes/:id", function(req, res) {
    console.log(req.params.id)
    var noteID = "ObjectId(" + req.params.id
    // return db.Note.findByIdAndDelete(req.params.id)
    db.Note.deleteOne({_id: req.params.id})
    .then(function() {
        console.log("success")
    })
    .catch(function(err){
        console.log(err)
    });
})

// app.get("/articles/:id", function(req, res) {
//     // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
//     db.Article.findOne({ _id: req.params.id })
//       // ..and populate all of the notes associated with it
//       .populate("note")
//       .then(function(dbArticle) {
//         // If we were able to successfully find an Article with the given id, send it back to the client
//         var notesObj = {
//             data: dbArticle
//         }
//         // res.json(dbArticle);
//         res.render("notes", notesObj)
//       })
//       .catch(function(err) {
//         // If an error occurred, send it to the client
//         res.json(err);
//       });
//   });
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