import express from 'express';
import { getBooks, getBookByISBN, searchBooks } from '../controllers/bookController.js';


const router = express.Router();

router.get('/',getBooks);
router.get('/search', searchBooks);
router.get('/:isbn', getBookByISBN);


export default router;