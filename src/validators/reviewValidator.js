import Joi from "joi";
import {validateRequest} from "../middlewares/validateRequest.js"

const addReviewSchema = Joi.object({
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().min(1).required()
});

const updateReviewSchema = Joi.object({
    rating: Joi.number().integer().min(1).max(5).optional(),
    comment: Joi.string().min(1).optional()
}).or('rating', 'comment');

const addReviewValidator = validateRequest(addReviewSchema);
const updateReviewValidator = validateRequest(updateReviewSchema);

export {addReviewValidator, updateReviewValidator};

