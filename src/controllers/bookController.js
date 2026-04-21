import express from "express";
import { prisma } from "../config/db.js";

const getBooks = async (req, res) => {
    const books = await prisma.book.findMany();
    return res.status(200).json({
        success:true,
        data: books,
    });
};

const getBookByISBN = async (req,res)=>{
    const {isbn} = req.params;
    const book = await prisma.book.findUnique({
        where:{isbn},
    })
    if(!book){
        return res.status(404).json({
            success:false,
            message:"Book not found"
        })
    }
    return res.status(200).json({
        success:true,
        data: book
    })
};

const searchBooks = async (req,res)=>{
    //destructure tile, author, isbn from req.query
    const {title, author} = req.query;
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
    if(books.length === 0){
        return res.status(404).json({error: "No books found"});
    }
    return res.status(200).json({
        data: books,
    })
};

export {getBooks, getBookByISBN, searchBooks};