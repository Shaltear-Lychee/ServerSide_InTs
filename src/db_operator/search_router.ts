import { Request, Response, Router } from 'express'
import { AnyError, Db, Document, MongoClient } from 'mongodb'

const search_router: Router = Router()
const DB_NAME = 'testdb'
const MONGODB_URI = 'mongodb://localhost:27017/testdb'

search_router.get('/', (req: Request, res: Response) => {
  res.render('./search_ui')
})

search_router.post('/', (req: Request, res: Response) => {
  const search_words: string = req.body.search_words
  const reg = RegExp(search_words)
  MongoClient.connect(MONGODB_URI, (err?: AnyError, db?: MongoClient) => {
    if (err) {
      throw err
    } else if (db) {
      const database: Db = db.db(DB_NAME)
      database
        .collection('articles')
        .find({ title: reg })
        .toArray((err?: AnyError, docs?: Document[]) => {
          if (docs) {
            res.render('./search_result_ui', {
              docs: docs,
            })
          }
          db.close()
        })
    }
  })
})

export default search_router
