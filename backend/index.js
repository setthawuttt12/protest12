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

const auth = require('./routes/auth')
app.use('/api/auth',auth)

const dash = require('./routes/dash')
app.use('/api/dash',dash)

const profile = require('./routes/profile')
app.use('/api/profile',profile)

//staff api

const member = require('./routes/Staff/member')
app.use('/api/Staff/member',member)

const topic = require('./routes/Staff/topic')
app.use('/api/Staff/topic',topic)

const indicate = require('./routes/Staff/indicate')
app.use('/api/Staff/indicate',indicate)

const round = require('./routes/Staff/round')
app.use('/api/Staff/round',round)

const eva = require('./routes/Staff/eva')
app.use('/api/Staff/eva',eva)

const commit = require('./routes/Staff/commit')
app.use('/api/Staff/commit',commit)

const doc = require('./routes/Staff/doc')
app.use('/api/Staff/doc',doc)

const status = require('./routes/Staff/status')
app.use('/api/Staff/status',status)

const score_member5 = require('./routes/Staff/score_member')
app.use('/api/Staff/score_member',score_member5)

const score_commit5 = require('./routes/Staff/score_commit')
app.use('/api/Staff/score_commit',score_commit5)

app.use((req,res)=>res.status(404).json({message:'Route not Found'}))
app.listen(3001,()=>{
    console.log("Server running on port 3001");
    
})