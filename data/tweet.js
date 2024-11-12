// 트위터 데이터 처리

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


// 모든 트윗을 리턴
export async function getAll(){
    return tweets
}
// 아이디에 대한 트윗을 리턴
export async function getAllByUsername(username){
    return tweets.filter((tweet) => tweet.username == username)
}
// 글 번호에 대한 트윗을 리턴
export async function getById(id){
    return tweets.find((tweet) => tweet.id === id)
}

// 트윗을 작성
export async function create(username,name,text){
    const tweet = {
        // 리터럴 표기
        id:'4',
        username: username,
        name: name,
        text: text,
        createdAt: Date.now().toString()
    }
    tweets = [tweet,...tweets]
    return tweet
}

// 트윗을 변경
export async function update(id,text){
    const tweet = tweets.find((tweet) => tweet.id === id)
    if(tweet){
        tweet.text = tweet
    }
    return tweet
}

// 트윗을 삭제
export async function remove(id){
    tweets = tweets.filter((tweet) => tweet.id !== id)
}