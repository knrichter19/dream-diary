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
    console.log("GET /dreams");
    const sql = "SELECT * FROM dreams";
    con.query(sql, (error, results, fields) =>{
        if (error){
            return console.error(error.message);
        }
        res.json(JSON.parse(JSON.stringify(results)));
    })
});

app.post("/dreams", (req, res)=>{
    const updatedOn = Date.now()
    console.log("POST /dreams");
    const sql = "INSERT INTO dreams (author, title, body, dreamedOn, postedOn, updatedOn, nightmare, lucid)"+
    "VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), ?, ?)";
    const vals = [req.body.author, req.body.title, req.body.body, 
        req.body.dreamedOn, req.body.nightmare, req.body.lucid]

    con.query(sql, vals, (err, result) => {
        if (err) throw err;
        const id = result.insertId;
        // return the inserted dream to the user - TODO make return status code
        con.query("SELECT * FROM dreams WHERE id="+id, (err, result) =>{
            if (err) throw err;
            res.json({
                status: 200,
                result: result[0]
            });
        });
    })
});

app.put("/dreams/:id", (req, res)=>{
    console.log(`PUT /dreams/${req.params.id}`);
    const sql = "UPDATE dreams" + 
    "SET title=?; body=?, dreamedOn=?, updatedOn=CURRENT_TIMESTAMP(), nightmare=?, lucid=?" + 
    "WHERE id=?";
    const vals = [req.body.title, req.body.body, req.body.dreamedOn, req.body.nightmare, req.body.lucid]
    con.query(sql, vals, (err, result) => {
        if (err) throw err;
        const id = result.insertId;
        // return the inserted dream to the user - TODO make return status code
        con.query("SELECT * FROM dreams WHERE d_id="+id, (err, result) =>{
            if (err) throw err;
            res.send(result[0]);
        });
    })
})

app.get("/dreams/:id", (req, res)=>{
    console.log(`GET /dreams/${req.params.id}`)
    const sql = "SELECT * FROM dreams WHERE id=?";
    con.query(sql, req.params.id, (error, results, fields) =>{
        if (error){
            return console.error(error.message);
        }
        let returnVal = {}
        try {
            returnVal = JSON.parse(JSON.stringify(results[0]));
        } catch (err) {
            res.sendStatus(404);
        }
        res.json(returnVal);
    })
});

app.delete("/dreams/:id", (req, res)=>{
    console.log(`DELETE /dreams/${req.params.id}`)
});


// user endpoints
app.get("/users", (req, res)=>{
    console.log("GET /users");
});

app.post("/users", (req, res)=>{
    console.log("POST /users")
});

app.get("/users/:id", (req, res)=>{
    console.log(`GET users/${req.params.id}`)
});

app.get("/users/:id/dreams", (req,res)=>{
    console.log(`GET users/${req.params.id}/dreams`)
});