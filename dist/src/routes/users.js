"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const userValidator_1 = require("../middlewares/validators/userValidator");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post("/register", userValidator_1.createUserValidator, UserController_1.userController.register);
exports.userRouter.post("/login", UserController_1.userController.login);
