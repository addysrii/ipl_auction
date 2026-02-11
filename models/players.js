import mongoose, { mongo } from 'mongoose'

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    basePoints :{
        type:Number,
        required:true,
        },
    team: {
        type: String,
        default:null,
    },
    soldStatus : {
        type:Boolean,
        default:false
    },
    category: {
        type: String,
        required: true
    }
})

export  default mongoose.model('Players', playerSchema)
