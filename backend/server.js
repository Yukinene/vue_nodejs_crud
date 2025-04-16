require('dotenv').config()
const express = require('express')
const cors = require('cors')

const auth = require('./routes/auth')
const post = require('./routes/post')

const app = express()
app.use(cors())
app.use(express.json())

//Route
app.use('/api/auth', auth)
app.use('/api/posts', post)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`เซิฟเวอร์กำลังทำงานที่ พอร์ต ${PORT}`))
