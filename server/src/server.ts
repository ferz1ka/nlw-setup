import Fastify from "fastify";
import cors from "@fastify/cors"
import { Router } from "./router";

export const app = Fastify()

app.register(cors)
app.register(Router, { prefix: 'api/v1' })

app.listen({
  port: 3333,
  host: '0.0.0.0',
}, () => {
  console.log('Server running on port 3333')
})