"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var outcome_1 = __importDefault(require("./outcome"));
var searchHandler = express_1.default.Router();
searchHandler.use('/outcome', outcome_1.default);
searchHandler.get('/', function (req, res) {
    res.render('./uitemp', {
        title: 'Search',
    });
});
searchHandler.post('/', function (req, res) {
    var search_words = req.body.search_words;
    res.redirect('/search/outcome?param=' + search_words);
});
exports.default = searchHandler;
