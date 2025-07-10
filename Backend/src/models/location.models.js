import mongoose, { mongo } from "mongoose";

const locationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    districtId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'District',
        required: true
    },
    StateId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'State'
    },
})

export default mongoose.model('Location', locationSchema)