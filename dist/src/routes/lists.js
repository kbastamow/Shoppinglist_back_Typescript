"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRouter = void 0;
const express_1 = require("express");
const ListController_1 = require("../controllers/ListController");
const authentication_1 = require("../middlewares/authentication/authentication");
exports.listRouter = (0, express_1.Router)();
exports.listRouter.post("/", authentication_1.authentication, ListController_1.listController.createList);
