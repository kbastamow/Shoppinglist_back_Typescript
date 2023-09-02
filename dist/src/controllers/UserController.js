"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const validation_result_1 = require("express-validator/src/validation-result");
// import { sign, verify } from 'jsonwebtoken';
const database_1 = require("../../config/database");
const user_entity_1 = require("../entities/user.entity");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = require("jsonwebtoken");
dotenv_1.default.config();
//Confirmation missing!
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, validation_result_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).send({ errors: errors.array() });
            }
            const { username, email, password } = req.body;
            //Instantiate User entity (not strictly necessary)
            const newUser = new user_entity_1.User();
            newUser.username = username;
            newUser.email = email;
            newUser.password = yield bcrypt_1.default.hash(password, 10);
            newUser.confirmed = false;
            try {
                const createdUser = yield database_1.Db.getRepository(user_entity_1.User).save(newUser);
                return res.status(201).send({ msg: "New user created", user: createdUser });
            }
            catch (error) {
                console.error('Error creating user:', error);
                return res.status(500).send({ msg: 'Internal server error' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield database_1.Db.getRepository(user_entity_1.User).findOne({ where: { email: email } });
                if (!user) {
                    return res.status(400).send({ msg: "Incorrect username or password." });
                }
                const isMatch = bcrypt_1.default.compareSync(password, user.password);
                if (!isMatch) {
                    return res.status(400).send({ msg: "Incorrect username or password." });
                }
                const token = (0, jsonwebtoken_1.sign)({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "14d" });
                // Update the user entity with the new token
                user.token = token;
                // Save the user back to the database
                yield database_1.Db.getRepository(user_entity_1.User).save(user);
                res.send({ token, msg: `Welcome ${user.username}`, user });
            }
            catch (error) {
                console.error(error);
                return res.status(500).send({ msg: 'Internal server error' });
            }
        });
    }
}
exports.userController = new UserController();
