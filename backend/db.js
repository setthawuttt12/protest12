const mysql2 = require('mysql2')
const db = mysql2.createConnection({
    host:'localhost',
    user:'root',
    port:'3306',
    password:'1234',
    database:'pretest12'
})

module.exports = db.promise()