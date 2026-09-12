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

const auth = require('./routes/auth')
app.use('/api/auth',auth)

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

const show_eva = require('./routes/Commit/show_eva')
app.use('/api/Commit/show_eva',show_eva)

app.use((req,res)=>res.status(404).json({message:'Route not Found'}))
app.listen(3001,()=>{
    console.log("Server running on port 3001");
    
})