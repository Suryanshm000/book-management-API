const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");
const ObjectId = require("mongoose").Types.ObjectId;

//@desc Get all Books
const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();

  res.status(200).json(books);
});


//@desc Get Books by filtering
const getFilteredBooks = asyncHandler(async (req, res) => {
  const { author, publication_year} = req.query;
  const books = await Book.find();
  let filteredBooks = books;

  if(!author && !publication_year){
    res.status(400);
    throw new Error("author or publication_year field is mandatory!");
  }

  // filtering books based on the author query parameter
  if(author){
    filteredBooks = filteredBooks.filter(book => book.author === author);
  }

  // filtering books based on the publication year query parameter
  if (publication_year) {
    const yearInt = parseInt(publication_year);
    filteredBooks = filteredBooks.filter(book => book.publication_year === yearInt);
  }

  res.status(200).json(filteredBooks);
});


//@desc Create New Book
const createBook = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { title, author, publication_year } = req.body;
  if (!title || !author || !publication_year) {
    res.status(400);
    throw new Error("title, author and publication_year all fields are mandatory !");
  }
  const book = await Book.create({
    title,
    author,
    publication_year,
  });

  res.status(201).json(book);
});


//@desc Get Book
const getBook = asyncHandler(async (req, res) => {
  // object id is not of valid length
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid object id");
  }

  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("book not found");
  }
  res.status(200).json(book);
});


//@desc Update Book
const updateBook = asyncHandler(async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid object id");
  }

  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("book not found");
  }

  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedBook);
});


//@desc Delete Book
const deleteBook = asyncHandler(async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error("Invalid object id");
  }

  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  await Book.deleteOne({ _id: req.params.id });
  res.status(200).json(book);
});

module.exports = {
  getBooks,
  getFilteredBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
};
