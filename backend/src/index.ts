import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { getPool } from "./db/pool.js"

dotenv.config()

const app = express()
const PORT = Number(process.env.PORT) || 4000

const appOrigin = process.env.APP_URL || "http://localhost:3000"

// Middleware
app.use(express.json())
app.use(cors({
    origin: appOrigin,
    credentials: true
}))

app.get("/health", async (req, res) => {
    await getPool().query("SELECT 1") // Ensure the database connection is established

    try {
        res.status(200).json({
            status: "OK",
            service: "Agentic Calendar App",
            database: "Connected"
        })
    } catch (error) {
        res.status(503).json({
            status: "Service Unavailable",
            success: false,
            message: error instanceof Error ? error.message : "Internal server error"
        })
    }
})

app.listen(PORT, () => {
    console.log(`Agentic Calendar is running on port ${PORT}`)
})