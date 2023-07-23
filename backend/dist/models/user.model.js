"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    userAge: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    countryCode: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
});
exports.User = (0, mongoose_1.model)("User", UserSchema);
