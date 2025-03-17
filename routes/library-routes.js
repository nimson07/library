import { Router } from "express";
import { addBook, deleteBook, getAllBooks, getBooks, logIn, signUp, updateBookDetails } from "../controllers/library-controllers.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { remoteUpload } from "../middleware/upload.js";


const bookRouter = Router();
// user routes
bookRouter.post('/signup', signUp);
bookRouter.post('/login', logIn);



bookRouter.post('/books',remoteUpload.single('image'), authenticate ,addBook);

bookRouter.get('/allbooks', getAllBooks);

bookRouter.get('/books', authenticate, getBooks);

bookRouter.patch('/books/:id',remoteUpload.single('image'), authenticate, updateBookDetails);

bookRouter.delete('/books/:id', authenticate, deleteBook);

export default bookRouter;