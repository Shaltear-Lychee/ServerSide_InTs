import { Request, Response, Router } from 'express'
import { AnyError, InsertOneResult, MongoClient } from 'mongodb'

const insert_router = Router()
const DB_NAME = 'testdb'
const MONGODB_URI = 'mongodb://localhost:27017/testdb'

insert_router.get('/', (req: Request, res: Response) => {
  res.render('./insert_ui', {
    title: 'insert',
  })
})

insert_router.post('/', (req: Request, res: Response) => {
  MongoClient.connect(MONGODB_URI, (err?, db?) => {
    console.log('hello')
    if (err) {
      throw err
    } else {
      if (db) {
        const database = db.db(DB_NAME)
        type article = {
          id: number
          title: string
          content: string
          author: string
        }
        database
          .collection('articles')
          .find()
          .count()
          .then((res1: number) => {
            const article: article = {
              id: res1,
              title: req.body.article_title,
              content: req.body.article_content,
              author: req.body.article_author,
            }
            database.collection('articles').insertOne(article, (err?: AnyError, res2?: InsertOneResult<Document>) => {
              if (err) {
                throw err
              } else {
                console.log('insert successful. inserted: ' + res2)
              }
              db.close()
              res.redirect('/')
            })
          })
      }
    }
  })
})

export default insert_router
