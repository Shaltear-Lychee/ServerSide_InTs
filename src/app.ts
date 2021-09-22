import express, { Application, Request, Response } from 'express'
import router from './routertest'
import bodyParser from 'body-parser'
import insert_router from './db_operator/insert_router'
import search_router from './db_operator/search_router'

const app: Application = express()
app.use(bodyParser())

app.set('view engine', 'ejs')
app.use('/test', router)
app.use('/insert', insert_router)
app.use('/search', search_router)

const add = (x: number, y: number): number => x + y

app.get('/', (req: Request, res: Response) => {
  console.log(add(5, 5))
  res.send('Hello Fuckin Gentlemen')
})

app.listen(5000, () => {
  // connect()
  console.log('Server running')
})
