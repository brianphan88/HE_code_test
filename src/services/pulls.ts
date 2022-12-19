import axios, { AxiosError } from 'axios'

async function getPulls(owner: string, repo: string, accessToken: string = '') {
  const reposUrl = `https://api.github.com/repos/${owner}/${repo}/pulls`

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
    const { data } = await axios.get(reposUrl, config)
    return data
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
  getPulls
}