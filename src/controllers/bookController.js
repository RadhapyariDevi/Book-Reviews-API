import express from "express";
import { prisma } from "../config/db.js";

const getBooks = async (req, res, next) => {
    try {
        const books = await prisma.book.findMany();
        return res.status(200).json({
            success: true,
            data: books,
        });
    } catch (err) {
        next(err);
    }
};

const getBookByISBN = async (req, res, next) => {
    try {
        const { isbn } = req.params;
        const book = await prisma.book.findUnique({
            where: { isbn },
        })
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            })
        }
        return res.status(200).json({
            success: true,
            data: book
        })
    } catch (err) {
        next(err);
    }
};

const searchBooks = async (req, res, next) => {
    //destructure tile, author, isbn from req.query
    try {
        const { title, author } = req.query;
        const books = await prisma.book.findMany({
            // where: {
            //     title: title ? { contains: title, mode: "insensitive" } : undefined,
            //     author: author ? { contains: author, mode: "insensitive" } : undefined,
            // }
            where: {
                OR: [
                    title ? { title: { contains: title, mode: "insensitive" } } : null,
                    author ? { author: { contains: author, mode: "insensitive" } } : null,
                ].filter(Boolean),
            }

        });
        if (books.length === 0) {
            return res.status(404).json({ error: "No books found" });
        }
        return res.status(200).json({
            data: books,
        })
    } catch (err) {
        next(err);
    }
};

export { getBooks, getBookByISBN, searchBooks };