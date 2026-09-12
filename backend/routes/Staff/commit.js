const express = require('express')
const db = require('../../db')
const bc = require('bcrypt')
const router = express.Router()
const {verifyToken,requireRole} = require('../../middleware/authmiddleware')

router.post('/save/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        const {id_eva} = req.params
        
        await db.query(`delete from tb_commit where id_eva = ?`,[id_eva])
        const m = req.body
        const v = m.map(p=>[id_eva,p.id_member,p.role,'n'])
        const [rows] = await db.query(`insert into tb_commit(id_eva,id_member,level_commit,status_commit) values ?`,[v])
        res.json(rows,{message:"save commit"})
    } catch (error) {
        console.error("save commit failed",error);
        res.status(500).json({message:"save commit failed"})
        
    }

})


router.delete('/delete/:id_commit',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        
        const {id_commit} = req.params

        const [rows] = await db.query(`delete from tb_commit where id_commit = ?`,[id_commit])
        res.json(rows,{message:"delete commit"})
       
    } catch (error) {
        console.error("delete commit failed",error);
        res.status(500).json({message:"delete commit failed"})
        
    }

})

router.get('/header/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        
        const {id_eva} =req.params
        const [rows] = await db.query(`select * from tb_system s,tb_eva e,tb_member m where e.id_eva = ? and m.id_member = e.id_member and s.id_sys = e.id_sys order by id_eva desc`,[id_eva])
        res.json(rows[0],{message:"get header"})
       
    } catch (error) {
        console.error("get header failed",error);
        res.status(500).json({message:"get header failed"})
        
    }

})

router.get('/member/:id_eva',verifyToken,requireRole('ฝ่ายบุคลากร'),async(req,res)=>{

    try {
        const {id_eva} = req.params.id_eva
        const [pick] = await db.query(`select id_member,concat(fname,'',lname)as fullname_commit from tb_member where role = 'กรรมการประเมิน'`)
        const [picked] = await db.query(`select m.id_member,id_commit,fname,lname,level_commit as role from tb_member m,tb_commit c,tb_eva e where c.id_eva = ? and c.id_eva = e.id_eva and c.id_member = m.id_member`,[id_eva])
        res.json({pick,picked})
       
    } catch (error) {
        console.error("get Member failed",error);
        res.status(500).json({message:"get Member failed"})
        
    }

})
module.exports = router
