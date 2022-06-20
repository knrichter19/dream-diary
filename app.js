const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require('dotenv').config();

// express setup
const app = express();
const expressPort = 3000;
app.use(cors());
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
    const sql = "INSERT INTO dreams (author, dateDreamed, title, body, nightmare, lucid)"+
    "VALUES (?, ?, ?, ?, ?, ?)";
    const vals = [req.body.author, req.body.dateDreamed, req.body.title, 
        req.body.body, req.body.nightmare, req.body.lucid]

    con.query(sql, vals, (err, result) => {
        if (err) throw err;
        const id = result.insertId;
        // return the inserted dream to the user
        con.query("SELECT * FROM dreams WHERE d_id="+id, (err, result) =>{
            if (err) throw err;
            res.send(result[0]);
        });
    })
});

app.get("/dreams/:id", (req, res)=>{
    console.log(`Dream id=${req.params.id} GET endpoint`)
    const sql = "SELECT * FROM dreams WHERE d_id=?";
    con.query(sql, req.params.id, (error, results, fields) =>{
        if (error){
            return console.error(error.message);
        }
        let returnVal = {}
        try {
            returnVal = JSON.parse(JSON.stringify(results[0]));
        } catch (err) {
            console.log(results);
        }
        res.json(returnVal);
    })
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