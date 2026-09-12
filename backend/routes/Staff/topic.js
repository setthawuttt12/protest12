const express = require('express')
const db = require('../../db')
const bc = require('bcrypt')
const router = express.Router()
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        
        const {name_topic} = req.body
        const [rows] = await db.query(`insert into tb_topic(name_topic) values(?)`,[name_topic])
        res.json(rows,{message:"save topic"})
    } catch (error) {
        console.error("save topic failed",error);
        res.status(500).json({message:"save topic failed"})
        
    }

})

router.put('/update/:id_topic',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        
        const {name_topic} = req.body
        const {id_topic} = req.params

        const [rows] = await db.query(`update tb_topic set name_topic=? where id_topic = ?`,[name_topic,id_topic])
        res.json(rows,{message:"update topic"})

       
    } catch (error) {
        console.error("update topic failed",error);
        res.status(500).json({message:"update topic failed"})
        
    }

})

router.delete('/delete/:id_topic',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        
        const {id_topic} = req.params

        const [rows] = await db.query(`delete from tb_topic where id_topic = ?`,[id_topic])
        res.json(rows,{message:"delete topic"})
       
    } catch (error) {
        console.error("delete topic failed",error);
        res.status(500).json({message:"delete topic failed"})
        
    }

})

router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        

        const [rows] = await db.query(`select * from tb_topic order by id_topic desc`)
        res.json(rows,{message:"get topic"})
       
    } catch (error) {
        console.error("get topic failed",error);
        res.status(500).json({message:"get topic failed"})
        
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