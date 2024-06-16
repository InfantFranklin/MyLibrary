const express = require("express");
const router = express.Router();
const Author = require("../models/author");

// All author routes
router.get("/", async (req, res) => {
  try {
    let searchOptions = {};
    if (req.query.name !== null && req.query.name !== "") {
      searchOptions.name = new RegExp(req.query.name, "i");
    }
    
    const authors = await Author.find(searchOptions);
    res.render("authors/index", {
      authors: authors,
      searchOptions: req.query
    });
  } catch {
    res.redirect(`/`);
  }
});

// New author routes
router.get("/new", async (req, res) => {
  await res.render("authors/new", { author: new Author() });
});

// Create author routes
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });

  try {
    const newAuthor = await author.save();
    // res.redirect(authors/${newAuthor.id});
    res.redirect(`authors`);
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
});

module.exports = router;
