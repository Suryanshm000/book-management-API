const express = require("express");
const router = express.Router();
const {
  getBooks,
  createBook,
  getBook,
  getFilteredBooks,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);

router.get("/", getBooks);
router.get("/filter", getFilteredBooks);
router.get("/:id", getBook);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
