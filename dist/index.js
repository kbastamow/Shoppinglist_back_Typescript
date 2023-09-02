"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = require("./src/routes/users");
const lists_1 = require("./src/routes/lists");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use("/users", users_1.userRouter);
app.use("/lists", lists_1.listRouter);
app.get("/", (req, res) => { res.send("Express-Typescript Server"); });
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
