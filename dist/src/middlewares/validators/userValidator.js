"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createUserValidator = [
    (0, express_validator_1.body)('username')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Username is required'),
    (0, express_validator_1.body)('email')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Provide valid email'),
    (0, express_validator_1.body)('password')
        .isString()
        .trim()
        .notEmpty()
        .withMessage('Password is required'),
];
