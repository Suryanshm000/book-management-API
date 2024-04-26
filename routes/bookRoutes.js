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

/**
 * @openapi
 * '/api/books':
 *  get:
 *     tags:
 *     - Book Controller
 *     summary: Get all the books
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/", getBooks);

/**
 * @openapi
 * '/api/books/filter':
 *  get:
 *     tags:
 *     - Book Controller
 *     summary: Get the books by using filter
 *     parameters:
 *      - name: author
 *        in: query
 *        schema:
 *          type: string
 *        description: Filter based on the author of the book
 *      - name: publication_year
 *        in: query
 *        schema:
 *          type: integer
 *        description: Filter based on the publication year of the book
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/filter", getFilteredBooks);

/**
 * @openapi
 * '/api/books/{id}':
 *  get:
 *     tags:
 *     - Book Controller
 *     summary: Get a book by id
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique Id of the book
 *        required: true
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get("/:id", getBook);

/**
 * @openapi
 * '/api/books':
 *  post:
 *     tags:
 *     - Book Controller
 *     summary: Create a book
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - author
 *              - publication_year
 *            properties:
 *              title:
 *                type: string
 *                default: Enhance coding
 *              author:
 *                type: string
 *                default: testauthor
 *              publication_year:
 *                type: integer
 *                default: 2024
 *        required: true
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post("/", createBook);

/**
 * @openapi
 * '/api/books/{id}':
 *  put:
 *     tags:
 *     - Book Controller
 *     summary: Modify a book
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - title
 *              - author
 *              - publication_year
 *            properties:
 *              title:
 *                type: string
 *                default: ''
 *              author:
 *                type: string
 *                default: ''
 *              publication_year:
 *                type: integer
 *                default:
 *        required: true
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique Id of the book
 *        required: true
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.put("/:id", updateBook);

/**
 * @openapi
 * '/api/books/{id}':
 *  delete:
 *     tags:
 *     - Book Controller
 *     summary: Delete a book
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The unique Id of the book
 *        required: true
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.delete("/:id", deleteBook);

module.exports = router;
