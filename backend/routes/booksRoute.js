import express from 'express';
import { Book } from '../models/bookModel.js';

const router=express.Router();
//route foor save book
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishingYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: tittle,author,publishingYear",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishingYear: request.body.publishingYear,
    };
    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: "Internal Server Error" });
  }
});

// Route for all books in db
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for one books in db by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const books = await Book.findById(id);
    return response.status(200).json({ book });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for update a book
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishingYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: tittle,author,publishingYear",
      });
    }
    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for delete a books
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const books = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;