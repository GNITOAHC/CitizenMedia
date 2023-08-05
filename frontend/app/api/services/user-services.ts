import axios from 'axios'
const API_URL = process.env.API_URL || 'http://localhost:8080'

interface newStoryData {
  id?: string | null
  content: string
  title: string
  subTitle: string
  tags: string[]
}

class StoryServices {
  /*
   * req.body = {
   *  id: string,
   *  content: string,
   *  title: string,
   *  subTitle: string,
   *  tags: string[],
   * }
   */
  async newStory(data: newStoryData, jwt_token: string) {
    console.log(data)
    return axios.post(`${API_URL}/story/create`, data, {
      headers: { authorization: `${jwt_token}` },
    })
  }
}

export default new StoryServices()
