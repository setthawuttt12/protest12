const express = require('express')
const db = require('../db')
const bc = require('bcrypt')
const router = express.Router()
const {verifyToken,requireRole} = require('../middleware/authmiddleware')

router('/staff',verifyToken,requireRole('ฝ่ายบุคลากร'),async (req,res) => {
    try {
        
        const [[staff]] = await db.query(`select count(*) from tb_member where`)

    } catch (error) {
        
    }
})

module.exports = router