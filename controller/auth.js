import * as authRepository from '../data/auth.js'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const secretkey = 'abcdefg1234%^&*'
const bcyrptSaltRounds = 10
const jwtExpiresInDays = '2h'

async function createJwtToken(id) {
    return jwt.sign({id}, secretkey,{expiresIn:jwtExpiresInDays})
}

export async function signup(req, res, next){
    const { username, password, name, email } = req.body
    // 회원중복체크
    const found = await authRepository.findByUsername(username)
    if(found){
        return res.status(409).json({message:`${username}이 이미 있습니다`})
    }
    // const users = await authRepository.createUser(username, password, name, email)
    const hashed = bcrypt.hashSync(password,bcyrptSaltRounds)
    const users = await authRepository.createUser(username, hashed, name, email)
    //가입시 토큰 할당 (가입이 되자마자 로그인 되게 함)
    const token = await createJwtToken(users.id)
    res.status(201).json({token,username})
}
export async function login(req, res, next){
    const {username, password} = req.body
    const user = await authRepository.findByUsername(username)
    if(!user){
        return res.status(401).json(`${username} 아이디를 찾을 수 없음`)
    }
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword){
        return res.status(401).json({message: `아이디 또는 비밀번호 확인`})
    }
    const token = await createJwtToken(user.id)
    res.status(200).json({ token, username })
}

export async function verify(req,res,next) {
    const token = req.header['Token']
    if(token){
        res.status(200).json(token)
    }
}

export async function me(req,res,next) {
    const user = await authRepository.findById(req.userId)
    if(!user){
        return res.status(404).json({message:'일치하는 사용자가 없음'})
    }
    res.status(200).json({token:req.token ,username:user.username})
}