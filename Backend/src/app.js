const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

// Allow requests from the React frontend
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

// Middleware
app.use(express.json())
app.use(cookieParser())

// Import routes
const authRouter = require('./routes/auth.routes')

// Register routes
app.use('/api/auth', authRouter)

module.exports = app