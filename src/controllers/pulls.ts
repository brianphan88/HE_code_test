import express from 'express'
const router = express.Router()

import pullsService from '../services/pulls'
import commitsService from '../services/commits'

import { Pull } from '../interface/Pull'

router.get('/', async (req, res) => {
  try {
    const { repositoryUrl = '' } = req.query
    const { authorization = '' } = req.headers

    const myUrl = new URL(repositoryUrl.toString())

    const [owner, repo] = myUrl.pathname.split('/').filter(Boolean)

    const pulls = await pullsService.getPulls(owner, repo, authorization)
    
    if (!pulls) {
      throw new Error('not found')
    }

    const commitCounts = await commitsService.getCommitCountsByPulls(pulls, authorization) || []

    const formattedResponse = pulls.map((pull: Pull, index: number) => {
      const { id, number, title, user } = pull

      return {
        id,
        number,
        title,
        author: user.login,
        commits: commitCounts[index]
      }
    })

    res.send(formattedResponse)
  } catch(error) {
    res.status(500).send('unable to get prs')
  }
})

export default router