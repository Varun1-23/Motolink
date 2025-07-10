import mongoose from 'mongoose'

const vehicleSchema = new mongoose.Schema({
    vehicleType: {
        type: String,
        enum: ['car' , 'bike'],
        required: true
    },
    model: String,
    year: String,
    number: String
})



const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        unique: true
    },
    password: String,
    vehicles: [vehicleSchema],
    isBlocked: {
        type: Boolean,
        default: false
    }
},
{ timestamps: true}
)

export default mongoose.model('User', userSchema)