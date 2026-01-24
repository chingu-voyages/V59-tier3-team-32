import { SERVER_ENV } from "./env.js"

export const corsConfig = {
    origin: SERVER_ENV.FRONTEND_ORIGIN,
    methods: ["GET", "OPTIONS", "PATCH", "POST"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true
}
