import express, { Request, Response } from 'express'
const router = express.Router()

router.get('/', (req: Request, res: Response): void => {
  res.render('./testejs', {
    title: 'MyfirstEJS',
    content: 'HelloFromMyFirstEJS',
  })
})

export default router
