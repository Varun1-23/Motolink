import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/index.js'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import mechanicRoutes from './routes/mechanic.routes.js'
import serviceRoutes from './routes/service.routes.js'
import workImageRoutes from './routes/workImage.routes.js'
import adminRoutes from './routes/admin.routes.js'
import reviewRoutes from './routes/review.routes.js'
import stateRoutes from './routes/state.routes.js'
import districtRoutes from './routes/district.routes.js'
import locationRoutes from './routes/location.routes.js'
import serviceRequestRoutes from './routes/serviceRequest.routes.js'
import customerRoutes from './routes/customer.routes.js'

dotenv.config()

const app = express()

//middleware 

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173' , 'http://localhost:5174' ],
    credentials: true
}))

// database connection
connectDB()

//sample route
app.get('/', (req, res) => {
    res.send('API is running')
})

// routes
app.use('/api/auth', authRoutes)
app.use('/api/mechanic', mechanicRoutes)
app.use('/api/service', serviceRoutes)
app.use('/api/workImage', workImageRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/review', reviewRoutes)
app.use('/api/state', stateRoutes)
app.use('/api/district', districtRoutes)
app.use('/api/location', locationRoutes)
app.use('/api/serviceRequest', serviceRequestRoutes)
app.use('/api/customer', customerRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))