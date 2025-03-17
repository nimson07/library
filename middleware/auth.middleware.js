import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    const tk = token.split(' ')[1] 

    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(tk, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ message: 'Failed to authenticate token' });
        req.user = { id: decoded.id }; // Attach the user ID to the request object
        next(); // Call the next middleware or route handler
    });
};