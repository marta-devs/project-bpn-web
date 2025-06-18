import axios from "axios"

const baseUrl = import.meta.env.BASE_URL || 'http://localhost:3333'

export const instanceAxios = axios.create({
  baseURL: `${baseUrl}/api/v1/`,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json"
  }
})

