const express = require('express')
const db = require('../../db')
const bc = require('bcrypt')
const router = express.Router()
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.post('/save',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        
        const {fname,lname,email,username,password,role} = req.body
        const hash = await bc.hash(password,10)
        const [rows] = await db.query(`insert into tb_member(fname,lname,email,username,password,role) values(?,?,?,?,?,?)`,[fname,lname,email,username,hash,role])
        res.json(rows,{message:"save Member"})
    } catch (error) {
        console.error("save Member failed",error);
        res.status(500).json({message:"save Member failed"})
        
    }

})

router.put('/update/:id_member',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        
        const {fname,lname,email,username,password,role} = req.body
        const {id_member} = req.params
        if(password && password.trim()){
            const hash = await bc.hash(password,10)
            const [rows] = await db.query(`update tb_member set fname=?,lname=?,email=?,username=?,password=?,role=? where id_member = ?`,[fname,lname,email,username,hash,role,id_member])
            res.json(rows,{message:"update Member"})
        }else{
            const [rows] = await db.query(`update tb_member set fname=?,lname=?,email=?,username=?,role=? where id_member = ?`,[fname,lname,email,username,role,id_member])
            res.json(rows,{message:"update Member"})
        }
       
    } catch (error) {
        console.error("update Member failed",error);
        res.status(500).json({message:"update Member failed"})
        
    }

})

router.delete('/delete/:id_member',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        
        const {id_member} = req.params

        const [rows] = await db.query(`delete from tb_member where id_member = ?`,[id_member])
        res.json(rows,{message:"delete Member"})
       
    } catch (error) {
        console.error("delete Member failed",error);
        res.status(500).json({message:"delete Member failed"})
        
    }

})

router.get('/showE',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        

        const [rows] = await db.query(`select * from tb_member where role = 'ผู้รับการประเมินผล' order by id_member desc`)
        res.json(rows,{message:"get Member"})
       
    } catch (error) {
        console.error("get Member failed",error);
        res.status(500).json({message:"get Member failed"})
        
    }

})

router.get('/showC',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        

        const [rows] = await db.query(`select * from tb_member where role = 'กรรมการประเมิน' order by id_member desc`)
        res.json(rows,{message:"get Member"})
       
    } catch (error) {
        console.error("get Member failed",error);
        res.status(500).json({message:"get Member failed"})
        
    }

})
module.exports = router
