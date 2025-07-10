import mongoose from 'mongoose'

const requestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MechanicShop'
    },
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    description: String,
    media: [String],
    isEmergency:{
        type: Boolean,
        default: false
    },
    scheduledDate: {
        type: Date
    },
    scheduledTimeSlot:{
        type: String
    },
    status: {
        type: String,
        enum: ['pending' , 'accepted' , 'repairing' , 'ready' , 'completed' , 'cancelled'],
        default: 'pending'
    },
    estimatedCost: Number,
    finalCost: Number,
    invoiceUrl: String,
    paymentStatus: {
        type: String,
        enum: ['pending' , 'paid'],
        default: 'pending'
    },
} , {
    timestamps: true
})

export default mongoose.model('ServiceRequest', requestSchema)