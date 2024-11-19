import { config } from '../config.js'
import Mongoose, { Schema } from 'mongoose'



export async function connectDB() {
    return Mongoose.connect(config.db.host)
}

export function useVirtualId(schema) {
    schema.virtual('id').get(function () {
        return this._id.toString()
    })
    schema.set('toJSON',{ virtual:true})
    schema.set('toObject',{ virtual:true})
}

export function getUsers() {
    return db.collection('users')
}

export function getTweets() {
    return db.collection('tweets')
}