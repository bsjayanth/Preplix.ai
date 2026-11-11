const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')

const app = express()

// Allow cross-origin requests from the Vite dev server during local development.
if (process.env.NODE_ENV !== 'production') {
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }))
}

// Middleware
app.use(express.json())
app.use(cookieParser())

// Import routes
const authRouter = require('./routes/auth.routes')
const interviewRouter = require("./routes/interview.routes")

// Register routes
app.use('/api/auth', authRouter)
app.use("/api/interview", interviewRouter)

// Serve the built React application from the same origin in production.
if (process.env.NODE_ENV === 'production') {
    const frontendBuildPath = path.resolve(__dirname, '../../Frontend/dist')

    app.use(express.static(frontendBuildPath))

    app.use((req, res, next) => {
        if (req.method !== 'GET' || req.path.startsWith('/api/')) {
            return next()
        }

        return res.sendFile(path.join(frontendBuildPath, 'index.html'), (error) => {
            if (error) next(error)
        })
    })
}

module.exports = app
