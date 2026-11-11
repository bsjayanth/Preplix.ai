
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

// CORS configuration
const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL
].filter(Boolean)

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}))

// Middleware
app.use(express.json())
app.use(cookieParser())

// Import routes
const authRouter = require('./routes/auth.routes')
const interviewRouter = require('./routes/interview.routes')

// Register routes
app.use('/api/auth', authRouter)
app.use('/api/interview', interviewRouter)

app.get('/healthz', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Preplix.ai backend is running'
    });
});

module.exports = app
