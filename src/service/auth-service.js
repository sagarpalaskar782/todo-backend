import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// Generate JWT token
export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expires in 1 hour
    });
};