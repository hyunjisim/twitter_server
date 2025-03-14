import dotenv from 'dotenv'

dotenv.config()
function required(key, defaultValue=undefined){
    const value = process.env[key] || defaultValue
    // 참이면 앞의값이 들어감 거짓이면 뒤의 값 들어감
    if(value == null){
        throw new Error(`키 ${key}는 undefined`)
    }
    return value
}


export const config = {
    jwt: {
        secretKey: required('JWT_SECRET'),
        expiresInSec: parseInt(required('JWT_EXPIRES_SEC',259200))
    },
    bcrypt: {
        saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS',10))
    },
    host: {
        port: parseInt(required('HOST_PORT',8080))
    },
    db: {
        host: required('DB_HOST'),
        user: required('DB_USER'),
        password: required('DB_PASSWORD'),
        database: required('DB_DATABASE'),
        port: required('DB_PORT')
    }
}