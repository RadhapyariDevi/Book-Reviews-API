import express from "express";
import {prisma} from "../config/db.js";


const addReview = async (req,res,next)=>{
    const {isbn} = req.params;
    const {rating,comment} = req.body;
    const userId = req.user.id;

    const book = await prisma.book.findUnique({
        where:{isbn},
    });
    if(!book){
        return res.status(404).json({error:"Book not found"});
    }

    const existingReview = await prisma.review.findUnique({
        where:{
            userId_bookId:{
                userId:userId,
                bookId:book.id
            }
        }
    });
    if(existingReview){
        return res.status(409).json({
            error:"You already reviewed this book"
        })
    }

    const review = await prisma.review.create({
        data:{
            rating,
            comment,
            userId,
            bookId: book.id
        }
    })

    return res.status(201).json({
        success:true,
        data: review,
        message:"Review added successfully"
    });
};

const updateReview = async (req,res,next)=>{
    const {reviewId} = req.params;
    const {rating, comment} = req.body;
    const userId = req.user.id;

    const review = await prisma.review.findUnique({
        where:{id:reviewId},
    });

    if(!review){
        return res.status(404).json({error:"Review not found"});
    }
    
};

const deleteReview = async (req,res,next)=>{

};

const getReviewsByISBN = async (req,res,next)=>{

};


export { addReview, updateReview, deleteReview, getReviewsByISBN }