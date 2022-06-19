const express = require("express");
const app = express();
const expressPort = 3000;

app.listen(expressPort, () => {
    console.log(`listening on port ${expressPort}`)
});

app.get("/dreams", (req, res)=>{
    res.send("Dream GET endpoint")
});

app.post("/dreams", (req, res)=>{
    res.send("Dream POST endpoint")
});

app.get("/dreams/:id", (req, res)=>{
    res.send(`Dream id=${req.params.id} GET endpoint`)
});

app.delete("/dreams/:id", (req, res)=>{
    res.send(`Dream id=${req.params.id} DELETE endpoint`)
});

app.get("/users", (req, res)=>{
    res.send("Users GET endpoint");
});

app.post("/users", (req, res)=>{
    res.send("Users POST endpoint")
});

app.get("/users/:id", (req, res)=>{
    res.send(`User id=${req.params.id} GET endpoint`)
});

app.get("/users/:id/dreams", (req,res)=>{
    res.send(`User id=${req.params.id} dream GET endpoint`)
});