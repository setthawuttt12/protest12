const express = require('express')
const db = require('../../db')
const bc = require('bcrypt')
const router = express.Router()
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        
        const {id_topic,name_indicate,detail_indicate,point_indicate,check_indicate} = req.body
        const [rows] = await db.query(`insert into tb_indicate(id_topic,name_indicate,detail_indicate,point_indicate,check_indicate) values(?,?,?,?,?)`,[id_topic,name_indicate,detail_indicate,point_indicate,check_indicate])
        res.json(rows,{message:"save indicate"})
    } catch (error) {
        console.error("save indicate failed",error);
        res.status(500).json({message:"save indicate failed"})
        
    }

})

router.put('/update/:id_indicate',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        
        const {id_topic,name_indicate,detail_indicate,point_indicate,check_indicate} = req.body
        const {id_indicate} = req.params

        const [rows] = await db.query(`update tb_indicate set id_topic=?,name_indicate=?,detail_indicate=?,point_indicate=?,check_indicate=? where id_indicate = ?`,[id_topic,name_indicate,detail_indicate,point_indicate,check_indicate,id_indicate])
        res.json(rows,{message:"update topic"})

       
    } catch (error) {
        console.error("update indicate failed",error);
        res.status(500).json({message:"update indicate failed"})
        
    }

})

router.delete('/delete/:id_indicate',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        
        const {id_indicate} = req.params

        const [rows] = await db.query(`delete from tb_indicate where id_indicate = ?`,[id_indicate])
        res.json(rows,{message:"delete indicate"})
       
    } catch (error) {
        console.error("delete indicate failed",error);
        res.status(500).json({message:"delete indicate failed"})
        
    }

})

router.get('/show',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        

        const [rows] = await db.query(`select * from tb_indicate,tb_topic where tb_indicate.id_topic = tb_topic.id_topic order by id_indicate desc`)
        res.json(rows,{message:"get indicate"})
       
    } catch (error) {
        console.error("get indicate failed",error);
        res.status(500).json({message:"get indicate failed"})
        
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
