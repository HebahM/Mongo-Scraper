
$("#scrapeButton").on("click", function (event) {
    // event.preventDefault();
    $.ajax("/scrape", {
        type: "GET"
    })
        .then(function (data) {
            console.log("console log from data in then on front end............")
            console.log(data)
            // window.location.replace("/")
            location.reload();
            // setTimeout(window.location.replace("/"), 2000);
        });
        
    // location.reload();
})

$(document).on("click", "#saveArticle", function() {
    event.preventDefault();
    var idToSave = $(this).attr("data-id");
    var articleToSave = {id: idToSave, saved: true}
    console.log(idToSave)
    // $.post("/saved", articleToSave)
})

// $.ajax("/api/burgers", {
//     type: "POST",
//     data: newBurger
//   }).then(
//     function() {
//       console.log("added new burger");
//       // Reload the page to get the updated list
//       location.reload();
//     }
//   );