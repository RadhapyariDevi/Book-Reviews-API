import express from "express";
import { addReview, updateReview, deleteReview, getReviewsByISBN } from "../controllers/reviewController.js";
import { protect } from "../middlewares/authmiddlewares.js";

const router = express.Router();

router.use(protect);

router.post('/:isbn', addReview);
router.put('/:reviewId', updateReview);
router.delete('/:reviewId', deleteReview);
router.get('/:isbn', getReviewsByISBN);

export default router;


