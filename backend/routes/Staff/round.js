const express = require('express')
const db = require('../../db')
const bc = require('bcrypt')
const router = express.Router()
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        
        const {day_open,day_out,round_sys,year_sys,status_sys} = req.body
        const [rows] = await db.query(`insert into tb_system(day_open,day_out,round_sys,year_sys,status_sys) values(?,?,?,?,?)`,[day_open,day_out,round_sys,year_sys,status_sys])
        res.json(rows,{message:"save round"})
    } catch (error) {
        console.error("save round failed",error);
        res.status(500).json({message:"save round failed"})
        
    }

})

router.put('/update/:id_sys',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        
        const {day_open,day_out,round_sys,year_sys,status_sys} = req.body
        const {id_sys} = req.params

        const [rows] = await db.query(`update tb_system set day_open=?,day_out=?,round_sys=?,year_sys=?,status_sys=? where id_sys = ?`,[day_open,day_out,round_sys,year_sys,status_sys,id_sys])
        res.json(rows,{message:"update round"})

       
    } catch (error) {
        console.error("update round failed",error);
        res.status(500).json({message:"update round failed"})
        
    }

})

router.delete('/delete/:id_sys',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        
        const {id_sys} = req.params

        const [rows] = await db.query(`delete from tb_system where id_sys = ?`,[id_sys])
        res.json(rows,{message:"delete round"})
       
    } catch (error) {
        console.error("delete round failed",error);
        res.status(500).json({message:"delete round failed"})
        
    }

})

router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        

        const [rows] = await db.query(`select * from tb_system where status_sys != 'ปิด' order by id_sys desc`)
        res.json(rows,{message:"get round"})
       
    } catch (error) {
        console.error("get round failed",error);
        res.status(500).json({message:"get round failed"})
        
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
