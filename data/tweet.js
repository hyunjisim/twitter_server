import MongoDb from 'mongodb'
import { getTweets } from '../db/database.js'
import * as UserRepository from './auth.js'
// 번호를 넣지 않고 트윗에 들어갈 유저가 있다면 통째로 객체로 넣어버림
const ObjectID = MongoDb.ObjectId

export async function getAll() {
    return getTweets().find().sort({ createdAt: -1 }).toArray().then(mapTweets)
}

export async function create(text,userId) {
    return UserRepository.findById(userId)
        .then((user)=> getTweets().insertOne({
            text,
            createdAt: new Date(),
            userId,
            name: user.name,
            username: user.username,
            url: user.url
        }))
        .then((result)=> {
            const insertedTweetId = result.insertedId
            return getTweets().findOne({ _id: result.insertedId})
        })
        .then(mapOptionalTweet)
}

export async function getAllByUsername(username) {
    return getTweets()
        .find({username})
        .sort({ createdAt: -1 }) // 최신순 정렬
        .toArray() // 배열로 변환
        .then(mapTweets)
}

export async function getById(id) {
    return getTweets()
        .find({_id: new ObjectID(id)}) // ID로 단일 문서 검색
        .next()
        .then(mapOptionalTweet)
}

 // ID로 단일 문서 검색
export async function update(id, text) {
    return getTweets().findOneAndUpdate(
            { _id: new ObjectID(id)},{ $set: {text} },{ returnDocument: 'after' }
        ).then((result) => result).then(mapOptionalTweet)
}

export async function remove(id) {
    return getTweets().deleteOne({ _id: new ObjectID(id)})
}

function mapOptionalTweet(tweet) {
    return tweet ? { ...tweet, id: tweet._id.toString() } : tweet
}

function mapTweets(tweets) {
    return tweets.map(mapOptionalTweet)
}