import MongoDb from 'mongodb'
import { getUsers } from '../db/database.js'

const ObjectID = MongoDb.ObjectId

export async function findByUsername(username) {
    return getUsers().find({username}).next().then(mapOtionalUser)
}

export async function findById(id) {
    return getUsers().find({ _id: new ObjectID(id) })
    .next()
    .then(mapOtionalUser)
}

export async function createUser(user) {
    return getUsers().insertOne(user).then((result)=> result.insertedId.toString())
}


function mapOtionalUser(user) {
    return user ? { ...user, id: user._id.toString() } : user
}