import axios from "axios";

export const api = axios.create({
  baseURL: 'https://4431-189-37-67-47.ngrok.io/api/v1'
})