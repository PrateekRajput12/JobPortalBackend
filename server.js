import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './utils/db.js'
import userRoute from './routes/user.Route.js'

import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'
import applicationRoute from './routes/application.route.js'

// import path from 'path'
dotenv.config()
const app = express()

// const _dirname = path.resolve()

app.get('/home', (req, res) => {
    return res.status(200).json({
        message: "I am coming from backend",
        success: true
    })
})
// Middle ware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const corsOption = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOption))


const PORT = process.env.PORT || 7070

// Apis

app.use('/api/v1/user', userRoute)
app.use('/api/v1/company', companyRoute)
app.use('/api/v1/job', jobRoute)
app.use('/api/v1/application', applicationRoute)




app.listen(PORT, () => {
    connectDB()
    console.log(`Server running at port  ${PORT}`);
})
