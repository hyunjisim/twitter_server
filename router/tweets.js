// 트윗하는 기능

import express from 'express'
import * as tweetController from '../controller/tweet.js'

const router = express.Router()

// data ./data/tweet.js로 이동시켰음

// http://127.0.0.1:8080/tweets

// 해당 아이디에 대한 트윗 가져오기
// GET
// http://127.0.0.1:8080/tweets?username=:username
router.get('/', tweetController.getTweets)



// 글 번호에 대한 트윗 가져오기
// GET
// http://127.0.0.1:8080/tweets/:id

router.get('/:id', tweetController.getTweetByid)



// 트윗하기
// POST
// http://127.0.0.1:8080/tweets
// json 형태로 입력 후 추가된 데이터까지 모두 json으로 출력
router.post('/', tweetController.postTweet)


// 트윗 수정하기
// PUT
// http://127.0.0.1:8080/tweets/:id
// json 형태로 입력 후 추가된 데이터까지 모두 json으로 출력
router.post('/:id', tweetController.putTweet)


// 트윗하기 삭제하기
// DELETE
// http://127.0.0.1:8080/tweets/:id
router.delete('/:id', tweetController.deleteTweet )

export default router