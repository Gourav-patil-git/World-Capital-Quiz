import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db =new pg.Client({
    user:"postgres",
    host:"localhost",
    password:"root",
    database:"world",
    port:5432,
});

const app= express();
const port=3000;

db.connect();
let quiz=[];

db.query("SELECT * FROM CAPITALS" ,(err ,res)=>{
    if (err) app.send("Internal server error");
    else quiz = res.rows;

db.end();
});

app.listen(port ,()=>{
    console.log(`server is running at http://localhost:${port} `);
})
