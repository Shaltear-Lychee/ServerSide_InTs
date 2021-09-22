"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongodb_1 = require("mongodb");
var search_router = (0, express_1.Router)();
var DB_NAME = 'testdb';
var MONGODB_URI = 'mongodb://localhost:27017/testdb';
search_router.get('/', function (req, res) {
    res.render('./search_ui');
});
search_router.post('/', function (req, res) {
    var search_words = req.body.search_words;
    var reg = RegExp(search_words);
    mongodb_1.MongoClient.connect(MONGODB_URI, function (err, db) {
        if (err) {
            throw err;
        }
        else if (db) {
            var database = db.db('testdb');
            database
                .collection('articles')
                .find({ title: reg })
                .toArray(function (err, docs) {
                if (docs) {
                    res.render('./search_result_ui', {
                        docs: docs,
                    });
                }
                db.close();
            });
        }
    });
});
exports.default = search_router;
