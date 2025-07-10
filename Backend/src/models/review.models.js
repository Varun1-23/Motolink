import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mechanicShop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MechanicShop',
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    Comment: {
        type: String,
        trim: true
    }
}, { timestamps: true})

export default mongoose.model('Review', reviewSchema)