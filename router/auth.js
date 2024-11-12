// 회원관리

import express from 'express'
import * as authController from '../controller/auth.js'

const router = express.Router()
// 회원가입
router.post('/signup',authController.signup)
// 로그인
router.post('/login',authController.login)
// 로그인 상태 유지
// http://127.0.0.1:8080/auth/signup


export default router