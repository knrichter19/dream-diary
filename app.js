const express = require("express");
const mysql = require("mysql");
require('dotenv').config();

// express setup
const app = express();
const expressPort = 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// mysql setup
const con = mysql.createConnection({
    host: "localhost",
    user: process.env.user,
    password: process.env.password,
    database: "dream_test"
});

con.connect((err)=>{
    if (err) throw err;
    console.log("connected to mysql!");
    app.listen(expressPort, () => {
        console.log(`listening on port ${expressPort}`)
    });
});


// dream endpoints 
app.get("/dreams", (req, res)=>{
    console.log("Dream GET endpoint")
    const sql = "SELECT * FROM dreams";
    con.query(sql, (error, results, fields) =>{
        if (error){
            return console.error(error.message);
        }
        res.json(JSON.parse(JSON.stringify(results)));
    })
});

app.post("/dreams", (req, res)=>{
    let sql = "INSERT INTO dreams (author, dateDreamed, title, body, nightmare, lucid) VALUES (";
    sql += req.body.author + ","
    sql += "'" + req.body.dateDreamed + "',"
    sql += "'" + req.body.title + "',"
    sql += "'" + req.body.body + "',"
    sql += req.body.nightmare + ","
    sql += req.body.lucid + ");"
    // todo: fix sql injection
    
    console.log("Dream POST endpoint")
    console.log(sql);

    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send("works");
    })
});

app.get("/dreams/:id", (req, res)=>{
    console.log(`Dream id=${req.params.id} GET endpoint`)
});

app.delete("/dreams/:id", (req, res)=>{
    console.log(`Dream id=${req.params.id} DELETE endpoint`)
});


// user endpoints
app.get("/users", (req, res)=>{
    console.log("Users GET endpoint");
});

app.post("/users", (req, res)=>{
    console.log("Users POST endpoint")
});

app.get("/users/:id", (req, res)=>{
    console.log(`User id=${req.params.id} GET endpoint`)
});

app.get("/users/:id/dreams", (req,res)=>{
    console.log(`User id=${req.params.id} dream GET endpoint`)
});