const express = require('express')
const db = require('../../db')
const bc = require('bcrypt')
const router = express.Router()
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        
        const {id_member,id_sys,day_eva} = req.body
        const [rows] = await db.query(`insert into tb_eva(id_member,id_sys,day_eva,status_eva) values(?,?,?,?)`,[id_member,id_sys,day_eva,1])
        res.json(rows,{message:"save eva"})
    } catch (error) {
        console.error("save eva failed",error);
        res.status(500).json({message:"save eva failed"})
        
    }

})

router.put('/update/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        
        const {id_member,id_sys,day_eva} = req.body
        const {id_eva} = req.params

        const [rows] = await db.query(`update tb_eva set id_member=?,id_sys=?,day_eva=? where id_eva = ?`,[id_member,id_sys,day_eva,id_eva])
        res.json(rows,{message:"update eva"})

       
    } catch (error) {
        console.error("update eva failed",error);
        res.status(500).json({message:"update eva failed"})
        
    }

})

router.delete('/delete/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        
        const {id_eva} = req.params

        const [rows] = await db.query(`delete from tb_eva where id_eva = ?`,[id_eva])
        res.json(rows,{message:"delete eva"})
       
    } catch (error) {
        console.error("delete eva failed",error);
        res.status(500).json({message:"delete eva failed"})
        
    }

})

router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        

        const [rows] = await db.query(`select * from tb_system s,tb_eva e,tb_member m where m.id_member = e.id_member and s.id_sys = e.id_sys order by id_eva desc`)
        res.json(rows,{message:"get eva"})
       
    } catch (error) {
        console.error("get eva failed",error);
        res.status(500).json({message:"get eva failed"})
        
    }

})

// router.get('/showC',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

//     try {
        

//         const [rows] = await db.query(`select * from tb_member where role = 'กรรมการประเมิน' order by id_member desc`)
//         res.json(rows,{message:"get Member"})
       
//     } catch (error) {
//         console.error("get Member failed",error);
//         res.status(500).json({message:"get Member failed"})
        
//     }

// })

module.exports = router
