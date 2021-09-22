"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
// import { connect } from './database_handlers/connect'
var insert_router_1 = __importDefault(require("./db_operator/insert_router"));
var search_router_1 = __importDefault(require("./db_operator/search_router"));
var app = (0, express_1.default)();
app.use((0, body_parser_1.default)());
app.set('view engine', 'ejs');
// app.use('/test', router)
// app.use('/search', searchHandler)
app.use('/insert', insert_router_1.default);
app.use('/search', search_router_1.default);
var add = function (x, y) { return x + y; };
app.get('/', function (req, res) {
    console.log(add(5, 5));
    res.send('Hello Fuckin Gentlemen');
});
app.listen(5000, function () {
    // connect()
    console.log('Server running');
});
