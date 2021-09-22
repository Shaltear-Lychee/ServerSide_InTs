"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mongodb_1 = require("mongodb");
var insert_router = (0, express_1.Router)();
var DB_NAME = 'testdb';
var MONGODB_URI = 'mongodb://localhost:27017/testdb';
insert_router.get('/', function (req, res) {
    res.render('./insert_ui', {
        title: 'insert',
    });
});
insert_router.post('/', function (req, res) {
    mongodb_1.MongoClient.connect(MONGODB_URI, function (err, db) {
        console.log('hello');
        if (err) {
            throw err;
        }
        else {
            if (db) {
                var database_1 = db.db(DB_NAME);
                database_1
                    .collection('articles')
                    .find()
                    .count()
                    .then(function (res1) {
                    var article = {
                        id: res1,
                        title: req.body.article_title,
                        content: req.body.article_content,
                        author: req.body.article_author,
                    };
                    database_1.collection('articles').insertOne(article, function (err, res2) {
                        if (err) {
                            throw err;
                        }
                        else {
                            console.log('insert successful');
                        }
                        db.close();
                        res.redirect('/');
                    });
                });
            }
        }
    });
});
exports.default = insert_router;
