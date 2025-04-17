require('dotenv').config()
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const cookieParser = require('cookie-parser')


const auth = require('./routes/auth')
const post = require('./routes/post')

const app = express()
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
  }))
app.use(express.json())


app.use(session({
    secret: 'w78^9p@z1uTf#L7bQ3*YsHd2E!kXv%Aa',   
    resave: false,               
    saveUninitialized: false,    
    cookie: { httpOnly: true,
        secure: false, 
        maxAge: 1000 * 60 * 60 * 24 
    }   
  }))

//Route
app.use('/api/auth', auth)
app.use('/api/posts', post)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`เซิฟเวอร์กำลังทำงานที่ พอร์ต ${PORT}`))
