import axios from 'axios'
const { createDfuseClient } = require('@dfuse/client')

const client = createDfuseClient({
  apiKey: 'web_9c560784f66574c2eddbeda903d2127d', // Your API key goes here
  network: 'kylin.eos.dfuse.io' // Specify the API endpoint you want to connect to here
})

const dfuseApi = axios.create({
  baseURL: 'https://kylin.eos.dfuse.io/'
})

async function getDfuseToken() {
  let response: any
  try {
    response = await client.authIssue('web_9c560784f66574c2eddbeda903d2127d')
    localStorage.setItem('dfuseToken', JSON.stringify(response))
  } catch (error) {
    console.log('An error occurred', error)
  }

  client.release()
  return response.token
}

async function apiDfuse(method: string, endpoint: string, params: any) {
  const jwt = localStorage.getItem('dfuseToken')
  if (jwt) {
    const token = JSON.parse(jwt)
    const now = Math.floor(new Date().getTime() / 1000)
    if (token.expires_at < now) {
      console.log(token.expires_at)
      console.log(now)
      const newToken = await getDfuseToken()
      dfuseApi.defaults.headers.common['Authorization'] = 'Bearer ' + newToken
    } else
      dfuseApi.defaults.headers.common['Authorization'] =
        'Bearer ' + token.token
  } else {
    const newToken = await getDfuseToken()
    dfuseApi.defaults.headers.common['Authorization'] = 'Bearer ' + newToken
  }
  try {
    if (method === 'get')
      return await dfuseApi.get(endpoint, {
        params: params
      })
    else return await dfuseApi.post(endpoint, params)
  } catch (error) {
    throw error
  }
}

export default apiDfuse
