// var express = require("express");
// var app = express();

var axios = require("axios");
var cheerio = require("cheerio");
// var mongoose = require("mongoose");
var db = require("../models");
// mongoose.connect("mongodb://localhost/MongoScraper", { useNewUrlParser: true });


var scrape = function () {
    // console.log("scrape js works")
    axios.get("http://reuters.com").then(function (response) {
        var $ = cheerio.load(response.data);
        // console.log("$ is: " + $)
        var articles = [];
        $("div.story-content").each(function (i, element) {

            var title = $(element).children("a").children("h3").text().trim();
            var link = $(element).children("a").attr("href");
            link = "https://reuters.com" + link;
            var preview = $(element).children("p").text();
            // var pic = $(element).siblings(".story-photo").children("a").children("img").attr("src")

            // Save these results in an object that we'll push into the results array we defined earlier
            if (title && link && preview) {
                articles.push({
                    title: title,
                    link: link,
                    preview: preview
                    // image: pic
                })
            };
        });
        console.log(articles)  
        // return articles;
        db.Article.create(articles)
            .then(function (dbArticle) {
                console.log(dbArticle)
            })
            .catch(function (err) {
                // If an error occurred, log it
                console.log(err);
            });

    })
    location.reload();
    return true;
};

// scrape();

module.exports = scrape;