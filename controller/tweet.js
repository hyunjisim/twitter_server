import * as tweetRepository from '../data/tweet.js'
// 모든 트윗을 가져오는 함수
export async function getTweets(req, res){
    const username = req.query.username
    const data = await (username ? tweetRepository.getAllByUsername(username) : tweetRepository.getAll())
    res.status(200).json(data)
}

/* 

export async function getTweetByid(req,res) {
    const id = req.params.id
    // ID가 제공되지 않은 경우
    if (!id) {
        return res.status(400).json({ message: 'ID가 필요합니다' })
    }

    // 해당 ID의 트윗을 가져옴
    const data = await tweetRepository.getById(id)

    // 트윗이 존재하는지 확인
    if (data) {
        res.status(200).json(data);
    } else {
        res.status(404).json({ message: `${id}의 트윗이 없습니다` })
    }
} 
*/

// 하나의 트윗 가져오는 함수
// 강사님 코드
export async function getTweetByid(req,res,next) {
    const id = req.params.id
    const tweet = await tweetRepository.getById(id)
    if(tweet){
        res.status(200).json(tweet)
    }else{
        res.status(404).json({message: `${id}의 트윗이 없습니다`})
    }
}


// 트윗을 생성하는 함수
// 강사님 코드
export async function postTweet(req,res,next) {
    const { username, name, text } = req.body
    const tweet = await tweetRepository.create(username, name, text)
    res.status(201).json(tweet)
}

/* 
export async function postTweet(req,res) {
    const { username,name,text } = req.body
    const tweet = {
        // 리터럴 표기
        id:'4',
        username: username,
        text: text,
        createdAt: Date.now().toString()
    }
    const tweets = await tweetRepository.getAll()
    // 모든 트윗 목록을 가져옴
    res.status(201).json(tweets)
}
 */
// router.post('/',(req,res,next)=>{
//     const { username,name,text } = req.body
//     const tweet = {
//         // 리터럴 표기
//         id:'4',
//         username: username,
//         text: text,
//         createdAt: Date.now().toString()
//     }
//     tweets = [tweet,...tweets]
//     res.status(201).json(tweets)
// })


// 트윗을 변경하는 함수
// 강사님 코드 
export async function putTweet(req, res,next) {
    const id = req.params.id
    const text = req.body.text
    const tweet = await tweetRepository.update(id, text)
    if(tweet){
        res.status(201).json(tweet)
    }else{
        res.status(404).json({message: `${id}의 트윗이 없습니다`})
    }
}


/* 
export async function putTweet(req, res) {
    const id = req.params.id // URL에서 트윗 ID를 가져옴
    const text = req.body.text // 수정할 텍스트를 요청 본문에서 가져옴

    // 해당 ID의 트윗을 찾기
    const tweet = await tweetRepository.getById(id)
    
    if (tweet) {
        // 트윗 내용 수정 (새로운 텍스트가 없으면 기존 텍스트 유지)
        tweet.text = text || tweet.text

        // 수정된 트윗을 저장
        await tweetRepository.update(id, tweet)

        // 수정된 트윗을 클라이언트로 응답
        res.status(200).json(tweet)
    } else {
        // 해당 ID의 트윗이 없을 경우 404 응답
        res.status(404).json({ message: `${id}의 트윗이 없습니다` })
    }
}
 */

// router.put('/:id', (req, res, next) => {
//     const id = req.params.id // URL에서 트윗 ID를 가져옴
//     const text = req.body.text // 수정할 텍스트를 요청 본문에서 가져옴

//     // 기존 트윗을 ID로 찾기
//     const tweet = tweets.find((tweet) => tweet.id === id)
    
//     if (tweet) {
//         // 트윗 내용 수정
//         tweet.text = text || tweet.text // 새로운 텍스트가 없으면 기존 텍스트 유지
//         res.status(201).json(tweet) // 수정된 트윗을 응답으로 보냄
//     } else {
//         // 해당 ID의 트윗이 없을 경우 404 응답
//         res.status(404).json({ message: `${id}의 트윗이 없습니다` })
//     }
// })

// 강사님 코드
export async function deleteTweet(req,res,next) {
    const id = req.params.id
    await tweetRepository.remove(id)
    res.sendStatus(204)
}


// router.delete('/:id', (req, res, next) => {
//     const id = req.params.id
//     tweets = tweets.filter((tweet) => tweet.id !== id)
//     res.status(204)
// })