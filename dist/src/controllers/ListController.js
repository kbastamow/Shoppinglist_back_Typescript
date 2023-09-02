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
Object.defineProperty(exports, "__esModule", { value: true });
exports.listController = void 0;
const database_1 = require("../../config/database");
// import { User } from '../entities/user.entity'
const list_entity_1 = require("../entities/list.entity");
class ListController {
    createList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listRepository = database_1.Db.getRepository(list_entity_1.List);
            // const userRepository = Db.getRepository(User);
            const { title, date } = req.body;
            // console.log(req.user)
            const newList = new list_entity_1.List();
            newList.title = title;
            newList.date = date;
            newList.total = 0;
            newList.active = true;
            // newList.user = req.user
            try {
                const createdList = yield listRepository.save(newList);
                res.status(201).send({ msg: "New list created", list: createdList });
            }
            catch (error) {
                console.log(error);
                res.status(500).send({ msg: "Internal server error" });
            }
        });
    }
}
exports.listController = new ListController();
