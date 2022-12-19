import path from 'path'
import express, { Request, Response, NextFunction} from 'express'

import pulls from './controllers/pulls'
import auth from './controllers/auth'

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(500).send('Something went wrong...')
  }
})

app.use('/pull-requests', pulls)
app.use('/auth', auth)

app.listen(port, () => {
  console.log(`he code test listening on port ${port}`)
})