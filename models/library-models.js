
import mongoose, { Schema, model } from "mongoose";
import normalize from 'normalize-mongoose';


const userSchema = new Schema ({
    username: {
        type : String,
        required : true,
        unique : true
    }, 
    password : {
        type: String,
        required : true,
    }, 
    books : [{ type: Schema.Types.ObjectId, ref: 'Book' }],
})

const UserModel = model('User', userSchema)

const bookSchema = new Schema ({
    title: {
        type: String,
        required: true,
        unique : true
    },

    description : {
        type : String
    },

    author: {
        type : String,
        required : true
    }, 
    genre: {
        type : String,
        required : true
    },

    image: {
        type: String,
        required: true
    },

    publishedYear: {
        type: Number
    }, 
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true
})

bookSchema.plugin(normalize);
userSchema.plugin(normalize);

const BookModel = model('Book', bookSchema);

export {UserModel , BookModel};
