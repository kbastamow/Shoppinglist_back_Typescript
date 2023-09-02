import { body, ValidationChain } from 'express-validator';

export const createUserValidator: ValidationChain[] = [
    body('username')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Username is required'),
    body('email')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Provide valid email'),
    body('password')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Password is required'),
];


