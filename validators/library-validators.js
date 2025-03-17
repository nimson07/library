import Joi from "joi";


// User validation schema
 export const userValidator = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.base': 'Username must be a string',
            'string.empty': 'Username cannot be empty',
            'string.min': 'Username must be at least 3 characters long',
            'string.max': 'Username cannot exceed 30 characters',
            'any.required': 'Username is required',
        }),
    
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.base': 'Password must be a string',
            'string.empty': 'Password cannot be empty',
            'string.min': 'Password must be at least 6 characters long',
            'any.required': 'Password is required',
        }),
});


// Book validation schema
export const addBookValidator = Joi.object({
    title: Joi.string().required(),
        
    description: Joi.string().required(),

    author: Joi.string().required(),

    genre: Joi.string().required(),
    
    publishedYear: Joi.number().required(),

    image : Joi.string().required(),

    userId: Joi.string()
});