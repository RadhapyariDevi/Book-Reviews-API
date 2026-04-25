import express from "express";
import { prisma } from "../config/db.js";

const addReview = async (req, res, next) => {
    try {
        const { isbn } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user.id;

        const book = await prisma.book.findUnique({
            where: { isbn },
        });
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        const existingReview = await prisma.review.findUnique({
            where: {
                userId_bookId: {
                    userId: userId,
                    bookId: book.id,
                },
            },
        });
        if (existingReview) {
            return res.status(409).json({
                error: "You already reviewed this book",
            });
        }

        const review = await prisma.review.create({
            data: {
                rating,
                comment,
                userId,
                bookId: book.id,
            },
        });

        return res.status(201).json({
            success: true,
            data: review,
            message: "Review added successfully",
        });
    } catch (err) {
        next(err);
    }
};

const updateReview = async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        const { rating, comment } = req.body;
        const userId = req.user.id;
        const reviewIdInt = Number(reviewId);

        const review = await prisma.review.findUnique({
            where: { id: reviewIdInt },
        });

        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        if (review.userId !== userId) {
            return res.status(403).json({ error: "You can only update your reviews" });
        }

        const updatedReview = await prisma.review.update({
            where: { id: reviewIdInt },
            data: {
                rating: rating !== undefined ? rating : review.rating,
                comment: comment !== undefined ? comment : review.comment,
            }
        });
        return res.status(200).json({
            success: true,
            data: updatedReview,
            message: "Review updated successfully",
        });
    } catch (err) {
        next(err);
    }
};

const deleteReview = async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        const reviewIdInt = Number(reviewId);
        const userId = req.user.id;

        const review = await prisma.review.findUnique({
            where: { id: reviewIdInt },
        });

        if (!review) {
            return res.status(404).json({ error: "Review not found" });
        }

        if (review.userId !== userId) {
            return res.status(403).json({ error: "You can only delete your reviews" });
        }
        const deletedReview = await prisma.review.delete({
            where: { id: reviewIdInt },
        });

        return res.status(200).json({
            success: true,
            data: deletedReview,
            message: "Review deleted successfully",
        });
    } catch (err) {
        next(err);
    }
};

const getReviewsByISBN = async (req, res, next) => {
    try {
        const { isbn } = req.params;
        const userId = req.user.id;

        const book = await prisma.book.findUnique({
            where: { isbn },
            include: {
                reviews: {
                    include: {
                        user: {
                            select: {
                                username: true,
                            }
                        }
                    }
                }
            }
        });

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        return res.status(200).json({
            success: true,
            data: book.reviews.map(review => ({
                id: review.id,
                rating: review.rating,
                comment: review.comment,
                user: review.user.username,
            })),
            message: "Reviews fetched successfully"
        })
    } catch (err) {
        next(err);
    }


};

export { addReview, updateReview, deleteReview, getReviewsByISBN };
