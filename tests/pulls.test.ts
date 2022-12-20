import request from 'supertest'
import app from '../src/app'

describe('GET /pull-requests', () => {
  it('should return pull request with commit count', async () => {
    const response = await request(app)
      .get('/pull-requests')
      .query({ repositoryUrl: 'https://github.com/brianphan88/HE_code_test' })
    
      // this is referencing live data. should be converted to static test data
      expect(response.statusCode).toBe(200)
      expect(response.body.length).toBeGreaterThan(0)
  })

  it('should error given a malformed requestUrl', async() => {
    const response = await request(app)
    .get('/pull-requests')
    .query({ repositoryUrl: 'hub.com/brianphan88/HE_code_test' })
  
    expect(response.statusCode).toBe(400)
    expect(response.text).toBe('invalid url')
  })

  it('should error give bad auth credential', async () => {
    const response = await request(app)
    .get('/pull-requests')
    .query({ repositoryUrl: 'https://github.com/brianphan88/HE_code_test' })
    .set('Authorization', 'bearer badToken')
  
    expect(response.statusCode).toBe(401)
    expect(response.text).toBe('Something went wrong...')
  })

  it('should error given non-existent owner', async () => {
    const response = await request(app)
    .get('/pull-requests')
    .query({ repositoryUrl: 'https://github.com/BADINFORMATION/BADINFORMATION' })
  
    expect(response.statusCode).toBe(404)
    expect(response.text).toBe('Something went wrong...')
  })
})