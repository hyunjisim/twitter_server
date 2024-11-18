import jwt from 'jsonwebtoken'
import * as authRepository from '../data/auth.js'
import { config } from '../config.js'

const AUTH_ERROR = {message: '인증 에러'}

export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    console.log('Authorization 헤더:', authHeader);

    if (!(authHeader && authHeader.startsWith('Bearer '))) {
        console.log('헤더 에러');
        return res.status(401).json({ message: '인증 헤더가 없습니다.' });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    
    try {
        decoded = jwt.verify(token, config.jwt.secretKey);
        console.log('디코딩된 토큰:', decoded);
    } catch (error) {
        console.error('토큰 인증 실패:', error);
        return res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }

    if (!decoded || !decoded.id) {
        console.log('토큰에 ID가 없음');
        return res.status(401).json({ message: '토큰에 사용자 정보가 없습니다.' });
    }

    try {
        const user = await authRepository.findById(decoded.id);
        if (!user) {
            console.log('사용자 없음');
            return res.status(401).json({ message: '사용자를 찾을 수 없습니다.' });
        }

        req.userId = user.id;
        next();
    } catch (error) {
        console.error('데이터베이스 조회 실패:', error);
        return res.status(500).json({ message: '서버 오류' });
    }
};


// export const isAuth = async(req,res,next)=>{
//     const authHeader = req.get('Authorization')
//     console.log(authHeader)

//     if(!(authHeader && authHeader.startsWith('Bearer '))){
//         console.log('헤더 에러')
//         return res.status(401).json(AUTH_ERROR)
//     }
//     const token = authHeader.split(' ')[1]

//     jwt.verify(
//         token, config.jwt.secretKey,async(error,decoded)=> {
//             if(error){
//                 console.log('토큰 에러')
//                 return res.status(401).json(AUTH_ERROR)
//             }
//             const user = await authRepository.findById(decoded.id)
//             if(!user){
//                 console.log('아이디 없음')
//                 return res.status(401).json(AUTH_ERROR)
//             }
//             req.userId =user.id
//             next()
//         }
//     )
// }

