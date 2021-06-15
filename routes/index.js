var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.redirect("/catalog");
});

//route parameters
//gets the value of bookid in obj form
router.get("/:userid/books/:bookid", function (req, res) {
  res.send(`${req.params.userid} and ${req.params.bookid}`);
});

module.exports = router;
