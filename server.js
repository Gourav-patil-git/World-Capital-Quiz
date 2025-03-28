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

let totalCorrect = 0;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let currentQuestion={};

app.get("/", async(req, res)=>{
    totalCorrect=0;
    await nextQuestion();
    res.render("index.ejs", {question: currentQuestion});

})

app.post("./submit", (req, res)=>{
    let answer = req.body.answer.trim();
    let isCorrect = false;

    if(currentQuestion.country.toLowerCase() === answer.toLowerCase()){
        totalCorrect++;
        isCorrect = true;

    }
    nextQuestion();
    res.render("index.ejs", {
        question: currentQuestion,
        wasCorrect: isCorrect,
        totalScore: totalCorrect,
    });
})
async function nextQuestion(){
    let randomCountry = quiz[Math.floor(Math.random()*quiz.length)];
    currentQuestion= randomCountry;
}

app.listen(port ,()=>{
    console.log(`server is running at http://localhost:${port} `);
})
