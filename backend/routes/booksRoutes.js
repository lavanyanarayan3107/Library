const router = require("express").Router();
const bookModel = require("../models/bookModel");

// Add a new book
router.post("/add", async (req, res) => {
  try {
    const data = req.body;
    const newBook = new bookModel(data);
    await newBook.save();
    res.status(200).json({ message: "Book added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding book", error });
  }
});

// Get all books
router.get("/getBooks", async (req, res) => {
  try {
    const books = await bookModel.find();
    res.status(200).json({ books });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching books", error });
  }
});

// Get a book by ID
router.get("/getBooks/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const book = await bookModel.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ book });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching book", error });
  }
});

// Update a book by ID
router.put("/books/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const updatedBook = await bookModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
});

// Delete a book by ID
router.delete("/books/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBook = await bookModel.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
});

module.exports = router;
