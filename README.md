# 🐦 Mini Twitter with Real-time Chat

간단한 트위터 클론 앱에 실시간 1:1 채팅 기능을 추가한 Node.js 기반 프로젝트입니다.  
로그인한 사용자끼리 트윗을 작성하고, 소켓을 이용해 실시간으로 대화할 수 있습니다.

---

## ✨ 주요 기능

- ✅ 회원가입 / 로그인
- 📝 트윗 작성, 수정, 삭제, 목록 조회
- 🔍 사용자별 트윗 필터링
- 💬 실시간 1:1 채팅 (Socket.io)
- ✅ 인증 미들웨어로 보호된 API

---

## 🛠 사용 기술

### Backend
- Node.js
- Express
- MongoDB / SQL (※ `script.sql` 포함 여부로 구분)
- Socket.io (실시간 채팅)
- express-validator (입력 유효성 검사)

---

## 📁 폴더 구조

```
project/
├── connection/            # 소켓 연결 관리
│   └── socket.js
├── controller/            # 요청 처리 로직
│   ├── auth.js
│   └── tweet.js
├── data/                  # DB 접근 모듈 (쿼리/모델 역할)
│   ├── auth.js
│   └── tweet.js
├── db/                    # DB 설정
│   └── database.js
├── middleware/            # 미들웨어 (auth, validation)
│   ├── auth.js
│   └── validator.js
├── router/                # 라우터 정의
│   ├── auth.js
│   └── tweets.js
├── app.js                 # 서버 초기화 및 라우터 연결
├── config.js              # 환경 설정
├── package.json           # 프로젝트 메타정보 및 의존성

```


---

## 🚀 실행 방법

1. 레포지토리 클론
```bash
git clone https://github.com/your-id/mini-twitter-chat.git
cd mini-twitter-chat

npm install

npm start
```

🙋‍♀️ 개발자
심현지
프로그래밍과 NLP/OCR에 관심 있는 백엔드 지망생입니다.
실시간 기능과 RESTful API 설계, 미들웨어 구성을 학습하며 개발했습니다.
