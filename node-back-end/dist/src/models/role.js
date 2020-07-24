"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const roleShema = new mongoose.Schema({
    name: String,
});
const roleModel = mongoose.model('Role', roleShema);
exports.default = roleModel;
//# sourceMappingURL=role.js.map