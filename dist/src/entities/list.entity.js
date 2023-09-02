"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const item_entity_1 = require("./item.entity");
let List = exports.List = class List {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], List.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 45,
        default: 'New List'
    }),
    __metadata("design:type", String)
], List.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => "now()" }),
    __metadata("design:type", Date)
], List.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], List.prototype, "active", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'float', nullable: true }),
    __metadata("design:type", Number)
], List.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.lists),
    __metadata("design:type", String)
], List.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => item_entity_1.Item, (item) => item.list, { cascade: ['insert', 'update', 'remove'] }),
    __metadata("design:type", Array)
], List.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], List.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], List.prototype, "updatedAt", void 0);
exports.List = List = __decorate([
    (0, typeorm_1.Entity)()
], List);
