import axios from 'axios'
const API_URL = process.env.API_URL || 'http://localhost:8080'

class UserServices {
  async getProfileLinks(jwt_token: string) {
    if (!jwt_token) return { data: 'No token' }
    return await axios.get(API_URL + '/user/profile-links', {
      headers: { Authorization: `${jwt_token}` },
    })
  }
}

export default new UserServices()
