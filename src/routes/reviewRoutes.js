import express from "express";
import { addReview, updateReview, deleteReview, getReviewsByISBN } from "../controllers/reviewController.js";
import { protect } from "../middlewares/authmiddlewares.js";
import { addReviewValidator, updateReviewValidator } from "../validators/reviewValidator.js";

const router = express.Router();


router.get('/:isbn', getReviewsByISBN);

router.use(protect);

router.post('/:isbn', addReviewValidator, addReview);
router.put('/:reviewId', updateReviewValidator, updateReview);
router.delete('/:reviewId', deleteReview);

export default router;


