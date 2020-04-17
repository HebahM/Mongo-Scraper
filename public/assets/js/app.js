// Scrape articles
$(document).on("click", "#scrapeButton", function (event) {
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

    location.reload();
})

// Save article
$(document).on("click", "#saveArticle", function (event) {
    // event.preventDefault();
    var idToSave = $(this).attr("data-id");
    var articleToSave = { id: idToSave, saved: true }
    console.log(articleToSave)
    $.post("/saved", articleToSave)
    location.reload();
})
// Delete from saved articles
$(document).on("click", "#deleteArticle", function (event) {
    // event.preventDefault();
    var idToSave = $(this).attr("data-id");
    var articleToSave = { id: idToSave, saved: false }
    $.post("/saved", articleToSave)
    console.log(articleToSave)
    location.reload();
})

// modal trigger
$(document).on("click", "#articleNotes", function () {
    var thisID = $(this).attr("data-id")
    console.log(thisID)
    var selector = "#" + thisID
    $.get("/articles/" + thisID, function(notesDB) {
        console.log(notesDB)
        console.log(notesDB.note)
        // console.log(notesDB.note.body)
    })
    $(selector).modal("show")
})
// Save note to DB
$(document).on("click", ".saveNote", function (event) {
    // event.preventDefault();
    var thisID = ($(this).attr("data-id"))
    var textarea = "note" + thisID;
    // console.log(newNote)
    var newNote = $("#" + textarea).val()
    console.log(newNote)
    var note = { body: newNote };
    // var note = { body: newNote };
    console.log(note)
    $.post("/articles/"+thisID, note)
})