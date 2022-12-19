import axios, { AxiosError } from 'axios'
import { Pull } from '../interface/Pull'

function getCommitCountsByPulls(pulls: Pull[], accessToken: string = '') {
  const config = {
    headers: {}
  }

  if (accessToken) {
    config.headers = {
      ...config.headers,
      Authorization: accessToken
    }
  }

  try {
    const commitCountOperations = pulls.map(async (pull: Pull) => {

      const { data } = await axios.get(pull.commits_url, config)
      return data.length
    })

    return Promise.all(commitCountOperations)
  } catch(error) {
    if (axios.isAxiosError(error))  {
      const typedError = error as AxiosError

      if (!typedError.response) {
        throw new Error('bad request')
      }

      if (typedError.response?.status === 401) {
        throw new Error('unauthorized')
      }

      if (typedError.response?.status === 422) {
        throw new Error('validation failed')
      }

    } else {
      throw error
    }
  }
}

export default {
  getCommitCountsByPulls
}