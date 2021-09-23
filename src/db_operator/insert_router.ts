import { Request, Response, Router } from 'express'
import { AnyError, InsertOneResult, MongoClient } from 'mongodb'
import { body, validationResult } from 'express-validator'

const insert_router = Router()
const DB_NAME = 'testdb'
const MONGODB_URI = 'mongodb://localhost:27017/testdb'

insert_router.get('/', (req: Request, res: Response) => {
  const form: {
    article_title: string
    article_content: string
    article_author: string
  } = {
    article_title: '',
    article_content: '',
    article_author: ''
  }
  res.render('./insert_ui', {
    errs_arr: null,
    form: form
  })
})

insert_router.post(
  '/',
  [
    body('article_title').not().isEmpty().withMessage('You cannnot insert without title'),
    body('article_content').not().isEmpty().withMessage('You cannot insert without the article content'),
    body('article_content').not().isEmpty().withMessage('You cannot insert without your name'),
  ],
  (req: Request, res: Response) => {
    MongoClient.connect(MONGODB_URI, (err?, db?) => {
      if (err) {
        throw err
      } else {
        if (db) {
          const validation_errs = validationResult(req)
          if (!validation_errs.isEmpty()) {
            res.render('./insert_ui', {
              errs_arr: validation_errs.array(),
              form: req.body
            })
          } else {
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
                database
                  .collection('articles')
                  .insertOne(article, (err?: AnyError, res2?: InsertOneResult<Document>) => {
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
      }
    })
  }
)

export default insert_router