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
exports.authentication = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("../../../config/database");
const user_entity_1 = require("../../entities/user.entity");
// import  {IJwtPayload} from '../../interfaces/IJwtPayload'
dotenv_1.default.config();
const authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(498).send("Invalid token");
        }
        const payload = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        if (!payload) {
            return res.status(498).send("Invalid token");
        }
        const user = yield database_1.Db.getRepository(user_entity_1.User).findOne({
            where: {
                id: payload.id
            }
        });
        console.log(exports.authentication);
        console.log(user);
        req.user = user;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error, msg: "Internal server error" });
    }
});
exports.authentication = authentication;
