import { BookModel, UserModel } from "../models/library-models.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { addBookValidator } from "../validators/library-validators.js";


// User Signup
export const signUp = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await UserModel.create({ username: req.body.username, password: hashedPassword });
        res.status(200).json({ message: 'User created successfully', newUser });
    } catch (error) {
        next(error);
    }
};


// User Login
export const logIn = async (req, res) => {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
};

// Add Book to User Shelf
export const addBook = async (req, res, next) => {
    try {
        // Check if the book already exists
        const { error, value } = addBookValidator.validate(
            {
              ...req.body,
              image: req.file?.filename,
            },
            { abortEarly: false }
          );
          if (error) {
            return res.status(422).json(error);
          }
        const existingBook = await BookModel.findOne({ title: req.body.title });
        
        if (existingBook) {
            // If the book exists, add it to the user's shelf
            await UserModel.findByIdAndUpdate(req.user.id, { $addToSet: { books: existingBook.id } }); // Use $addToSet to avoid duplicates
            return res.status(200).json({ message: 'Book added to Shelf', book: existingBook });
        } else {
            // If the book does not exist, create it
            const newBook = await BookModel.create({ ...value, userId: req.user.id });
            await UserModel.findByIdAndUpdate(req.user.id, { $push: { books: newBook._id } });
            return res.status(200).json({ message: 'New book created and added to Shelf', book: newBook });
        }
    } catch (error) {
        next(error);
    }
};

// get all books
export const getAllBooks = async (req, res, next)=> {

    try {
        const books = await BookModel.find()
        res.status(200).json(books)
    } catch (error) {
        next(error)
    }
}

// Get User's Books
export const getBooks = async (req, res, next) => {

   try {
    const user = await UserModel.findById(req.user.id).populate('books');
    res.status(200).json({ books: user.books, totalBooks: user.books.length });
   } catch (error) {
      next(error);
   }
}

//Update Book Details
export const updateBookDetails = async (req, res, next) => {

    try {

        const { error, value } = addBookValidator.validate(
            {
              ...req.body,
              image: req.file.filename,
            },
            { abortEarly: false }
          );
          if (error) {
            return res.status(422).json(error);
          }
        const results = await BookModel.findByIdAndUpdate(req.params.id, value, {new : true}); 
        res.status(200).json({ message: 'Book details Updated !', results});
    } catch (error) {
        next (error)
    }
}

// Delete Book from Shelf
export const deleteBook = async (req, res, next) => {

    try {
        const results = await BookModel.findByIdAndDelete(req.params.id);
        
        await UserModel.findByIdAndDelete(req.user.id, { $pull: { books: req.params.id } });

        res.status(200).json({ message : 'Book deleted from Shelf', results});
    } catch (error) {
        next(error)
    }
}