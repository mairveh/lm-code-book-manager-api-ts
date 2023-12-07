import { Request, Response } from "express";
import * as bookService from "../services/books";

export const getBooks = async (req: Request, res: Response) => {
	const books = await bookService.getBooks();
	res.json(books).status(200);
};

export const getBook = async (req: Request, res: Response) => {
	const bookId = req.params.bookId;
	const book = await bookService.getBook(Number(bookId));

	if (book) {
		res.json(book).status(200);
	} else {
		res.status(404).json({ message: `Book id: ${bookId} does not exist` });
	}
};

export const saveBook = async (req: Request, res: Response) => {
	const bookToBeSaved = req.body;
	const book = await bookService.getBook(Number(bookToBeSaved.bookId));

	if (book !== null && book.bookId === bookToBeSaved.bookId) {
		//if the bookId already exists return an error
		res.status(400).json({
			message: `A book with id: ${bookToBeSaved.bookId} already exist. Retry with a different book id`,
		});
		return;
	}

	try {
		const book = await bookService.saveBook(bookToBeSaved);
		res.status(201).json(book);
	} catch (error) {
		res.status(400).json({ message: (error as Error).message });
	}
};

// User Story 4 - Update Book By Id Solution
export const updateBook = async (req: Request, res: Response) => {
	const bookUpdateData = req.body;
	const bookId = Number.parseInt(req.params.bookId);

	try {
		const book = await bookService.updateBook(bookId, bookUpdateData);
		res.status(204).json(book);
	} catch (error) {
		res.status(400).json({ message: (error as Error).message });
	}
};

// User Story 5 - Delete Book By Id Solution
export const deleteBook = async (req: Request, res: Response) => {
	const bookIdToBeDeleted = Number(req.params.bookId);
	const book = await bookService.getBook(bookIdToBeDeleted);

	if (book === null) {
		//if the bookId doesn't exist return an error
		res.status(404).json(0);
		return;
	}
	try {
		const numberOfDeletedBooks = await bookService.deleteBook(bookIdToBeDeleted);
		res.status(200).json(numberOfDeletedBooks);
	} catch (error) {
		res.status(400).json({ message: (error as Error).message });
	}
};
