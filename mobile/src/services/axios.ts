import axios from "axios";

export const api = axios.create({
  baseURL: 'https://dda2-189-37-66-209.ngrok.io/api/v1'
})