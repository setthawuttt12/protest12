const express = require('express')
const db = ('../db.js')
const {verifyToken} = require('../middleware/authmiddleware')
const router = express.Router()

router.get('/',verifyToken,async(req,res)=>{
    try {
        const id_member = req.user.id_member
        const [rows] = await db.query(`select * from tb_member where id_member=?`,[id_member])
        res.json(rows[0])
    } catch (error) {
        console.error("Error Get User",error)
        res.status(500).json({message:'Error Get User'})
    }
})

module.exports =router