"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var outcome = express_1.default.Router();
outcome.get('/', function (req, res) {
    var search_words = req.query.param;
    res.render('./outcometemp', {
        title: 'outcome',
        words: search_words,
    });
});
exports.default = outcome;
