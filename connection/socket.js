import { Server } from "socket.io";
import jwt from 'jsonwebtoken'
import { config } from "../config.js";

class Socket{
    constructor(server){
        this.io = new Server(server,{
            cors: {
                // 코스에러 방지 포트가 다를때 에러나는것 방지
                origin: '*'
            }
        })

        this.io.use((socket,next)=>{
            const token = socket.handshake.auth.token
            if(!token){
                return next(new Error('인증 에러'))
            }
            jwt.verify(token, config.jwt.secretKey, (error,decoded)=>{
                if(error){
                    return next(new Error('인증 에러!'))
                }
                next()
            })
        })

        this.io.on('connection',(socket)=>{
            console.log('클라이언트 접속')
        })
    }
}


let socket

export function initSocket(server){
    if(!socket){
        socket = new Socket()
    }
}

export function getSocketIo(){
    if(!socket){
        throw new Error('먼저 init을 실행하세요')
    }
    return socket.io
}