import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
    name: String,
    price: String
})

const mechanicShopSchema = new mongoose.Schema({
    ownerName: String,
    shopName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    phone: String,
    address: String,
    workingHours: String,
    services: [serviceSchema],
    vehicleTypes: [{
        type: String
    }],
    workImages: [
        {
            type: String
        }
    ],
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location'
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: String,
        default: false
    }
}, {timestamps: true})

export default mongoose.model('MechanicShop', mechanicShopSchema)