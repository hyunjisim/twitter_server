import express from 'express'
import tweetsRouter from './router/tweets.js'
import authRouter from './router/auth.js'
import { config } from './config.js'
import { initSocket } from './connection/socket.js'
import { connectDB } from './db/database.js'

// import { db } from "./db/database.js"
// npm i cors
import cors from 'cors'


const app = express()
/* 
app.use(cors({
    origin: '*', // 모든 도메인에서 접근 허용
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // 인증 관련 헤더를 포함하도록 허용
}));

 */

app.use(cors({
    origin: '*',
    credentials: true
}))



app.use(express.json())

app.use('/tweets',tweetsRouter)
app.use('/auth',authRouter)


app.use((req,res,next)=>{
    res.sendStatus(404)
})
connectDB()
    .then(() => {
        const server = app.listen(config.host.port)
        initSocket(server)
    }).catch(console.error)
// db연결 확인
// db.getConnection().then((connection)=>console.log(connection))
// sequelize.sync().then(()=> {
//     const server = app.listen(config.host.port)
//     initSocket(server)
// })
