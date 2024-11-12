// 트윗하는 기능

import express from 'express'

const router = express.Router()


let tweets = [
    {
        id: '1',
        name: '카리나',
        username: 'karina',
        text: '카뤼나 로켓펀쳐',
        createdAt:Date.now().toString(),
        url:'https://www.google.com/imgres?q=%EC%B9%B4%EB%A6%AC%EB%82%98&imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2Ftbg3QAu-GnI%2Fmaxresdefault.jpg&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dtbg3QAu-GnI&docid=DzaC10mHSsKPpM&tbnid=7C1LmSRR1OBWBM&vet=12ahUKEwja35Wm2dWJAxWZyzQHHctrOMQQM3oECEkQAA..i&w=1280&h=720&hcb=2&ved=2ahUKEwja35Wm2dWJAxWZyzQHHctrOMQQM3oECEkQAA'
    },
    {
        id: '2',
        name: '윈터',
        username: 'winter',
        text: '윈터 아마멘터',
        createdAt:Date.now().toString(),
        url:'https://www.google.com/imgres?q=%EC%9C%88%ED%84%B0&imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2Fqe0gepQh8N0%2Fhq720.jpg%3Fsqp%3D-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD%26rs%3DAOn4CLAy8pt1XcwWtG0TEonIqRAqiFufyQ&imgrefurl=https%3A%2F%2Fm.youtube.com%2Fwatch%3Fv%3Dqe0gepQh8N0&docid=b4ycbmXWaRT-IM&tbnid=sMMCPPVfDWdLxM&vet=12ahUKEwicnfeH2dWJAxU-sFYBHR1zJK4QM3oECBYQAA..i&w=686&h=386&hcb=2&ved=2ahUKEwicnfeH2dWJAxU-sFYBHR1zJK4QM3oECBYQAA'
    },
    {
        id: '3',
        name: '닝닝',
        username: 'ningning',
        text: '닝닝 이디해커',
        createdAt:Date.now().toString(),
        url:'https://www.google.com/imgres?q=%EB%8B%9D%EB%8B%9D&imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2FCAZO-zqUzWU%2Fmaxresdefault.jpg&imgrefurl=https%3A%2F%2Fm.youtube.com%2Fwatch%3Fv%3DCAZO-zqUzWU&docid=L4Vo_f8-vbAE9M&tbnid=K3tFFvr3xYFQGM&vet=12ahUKEwiIgaud2dWJAxWu1zQHHf5_IYMQM3oECGgQAA..i&w=1280&h=720&hcb=2&ved=2ahUKEwiIgaud2dWJAxWu1zQHHf5_IYMQM3oECGgQAA'
    }
]





// http://127.0.0.1:8080/tweets

// 해당 아이디에 대한 트윗 가져오기
// GET
// http://127.0.0.1:8080/tweets?username=:username
router.get('/',(req,res,next)=>{
    // 물음표 뒤로 받을때는 query
    const username = req.query.username
    const data = username ? tweets.filter((tweet)=> tweet.username == username) : tweets
    res.status(200).json(data)
})



// 글 번호에 대한 트윗 가져오기
// GET
// http://127.0.0.1:8080/tweets/:id
router.get('/:id',(req,res,next)=>{
    // 숫자로 받을때는 아래처럼 params
    const id = req.params.id
    const tweet = tweets.find((tweet)=> tweet.id === id)
    if(tweet){
        res.status(200).json(tweet)
    }else{
        res.status(404).json({message:`${id}의 트윗이 없습니다`})
    }
})



// 트윗하기
// POST
// http://127.0.0.1:8080/tweets
// json 형태로 입력 후 추가된 데이터까지 모두 json으로 출력
router.post('/',(req,res,next)=>{
    const { username,name,text } = req.body
    const tweet = {
        // 리터럴 표기
        id:'4',
        username: username,
        text: text,
        createdAt: Date.now().toString()
    }
    tweets = [tweet,...tweets]
    res.status(201).json(tweets)
})


// 트윗 수정하기
// PUT
// http://127.0.0.1:8080/tweets/:id
// json 형태로 입력 후 추가된 데이터까지 모두 json으로 출력
router.put('/:id', (req, res, next) => {
    const id = req.params.id // URL에서 트윗 ID를 가져옴
    const text = req.body.text // 수정할 텍스트를 요청 본문에서 가져옴

    // 기존 트윗을 ID로 찾기
    const tweet = tweets.find((tweet) => tweet.id === id)
    
    if (tweet) {
        // 트윗 내용 수정
        tweet.text = text || tweet.text // 새로운 텍스트가 없으면 기존 텍스트 유지
        res.status(201).json(tweet) // 수정된 트윗을 응답으로 보냄
    } else {
        // 해당 ID의 트윗이 없을 경우 404 응답
        res.status(404).json({ message: `${id}의 트윗이 없습니다` })
    }
})




// 트윗하기 삭제하기
// DELETE
// http://127.0.0.1:8080/tweets/:id

router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    tweets = tweets.filter((tweet) => tweet.id !== id)
    res.status(204)
})


export default router