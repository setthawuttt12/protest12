require('dotenv').config({path:'.env'})
const express = require('express')
const cors = require('cors')
const fileup = require('express-fileupload')
const path = require('path')
const app = express()

app.use(cors(
    {
        origin:'http://localhost:3000',
        credentials: true
    }
))
app.use(express.json())
app.use(fileup())
app.use('/uploads',express.static(path.join(__dirname,'./uploads')))

const pf = require('./routes/profile')
app.use('/api/profile',pf)

const doc = require('./routes/docnoe')
app.use('/api/docnoe',doc)

const auth = require('./routes/auth')
app.use('/api/auth',auth)

const dash = require('./routes/dash')
app.use('/api/dash',dash)

//eva
// const selfeva = require('./routes/Eva/selfeva')
// app.use('/api/Eva/selfeva',selfeva)

// const scorem = require('./routes/Eva/score_member')
// app.use('/api/Eva/score_member',scorem)

// const scorec = require('./routes/Eva/score_commit')
// app.use('/api/Eva/score_commit',scorec)

//commit

const score_member2 = require('./routes/Commit/score_member')
app.use('/api/Commit/score_member',score_member2)

const check_confirm = require('./routes/Commit/check_confirm')
app.use('/api/Commit/check_confirm',check_confirm)

const score_commit = require('./routes/Commit/score_commit')
app.use('/api/Commit/score_commit',score_commit)



app.use((req,res)=>res.status(404).json({message:'Route not Found'}))
app.listen(3001,()=>{
    console.log("Server running on port 3001");
    
})