"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Db = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const user_entity_1 = require("../src/entities/user.entity");
dotenv_1.default.config();
exports.Db = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [user_entity_1.User],
    synchronize: true
});
// const db = mysql.createConnection({
// host : "localhost",
// user : "root",
// password : process.env.DB_PASSWORD,
// database : process.env.DB_NAME
// });
// db.connect((err) => {
//     if (err) {
//       console.error('Error connecting to the database:', err);
//       return;
//     }
//     console.log('Connected to the database');
//   });
exports.Db.initialize().then(() => {
    console.log("Connected to database");
});
