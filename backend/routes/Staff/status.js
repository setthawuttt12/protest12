const express = require('express')
const db = require('../../db')
const bc = require('bcrypt')
const router = express.Router()
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.get('/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        
        const {id_eva} =req.params
        const [rows] = await db.query(`select * from tb_commit c,tb_member m,tb_eva e where c.id_eva=? and c.id_eva = e.id_eva and c.id_member = m.id_member`,[id_eva])
        res.json(rows,{message:"get status"})
       
    } catch (error) {
        console.error("get status failed",error);
        res.status(500).json({message:"get status failed"})
        
    }

})

module.exports = router