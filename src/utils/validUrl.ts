import { Request, Response, NextFunction} from 'express'

export default function validUrl(req: Request, res: Response, next: NextFunction) {
  const { repositoryUrl = '' } = req.query

  try {
    new URL(repositoryUrl.toString())
    next()
  } catch(error) {
    res.status(400).send('invalid url')
  }
}