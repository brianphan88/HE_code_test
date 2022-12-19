import * as dotenv from 'dotenv'
import express from 'express'
import axios from 'axios'

const router = express.Router()
dotenv.config()

const { CLIENT_ID = '', CLIENT_SECRET = '' } = process.env

router.get('/', async (req, res) => {
  res.render('index', { client_id: CLIENT_ID })
})

router.get('/callback', async (req, res) => {
  console.log(req)
  const { code } = req.query
  const authUrl = `https://github.com/login/oauth/access_token`

  const body = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const { data } = await axios.post(authUrl, body, config)

  const parsedData = new URLSearchParams(data)
  const accessToken = parsedData.get('access_token') || ''

  res.render('access-token', { access_token: accessToken })
})

export default router