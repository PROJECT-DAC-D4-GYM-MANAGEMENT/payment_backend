const express = require("express");
const app = express();
const mysql = require("mysql");
const config = require("config");
const sms=require("../Helper/sms")
const connection = mysql.createConnection(config.get("dbDetails"));
app.get("/", (req, res) => {
  const statement = "select * from cricketer";
  connection.query(statement, (err, result) => {
    if (result){
      sms(` hey patil :: data is loaded`).then((msg)=>{console.log(msg)}).catch((err)=>{console.log(err)});
      res.send(JSON.stringify({ data: result, status: true }));
    } 
    
    else res.send(JSON.stringify({ status: false }));
  });
});

app.post("/", (req, res) => {
  const statement = `insert into cricketer values (default,'${req.body.name}','${req.body.role}','${req.body.age}','${req.body.pic}')`;
  connection.query(statement, (err, result) => {
    if (result) {
      sms(`hey patil :: 1 item is added`).then((msg)=>{console.log("success")}).catch((err)=>{console.log("error")})
      res.send(JSON.stringify({ status: true }));
    } else {
      res.send(JSON.stringify({ status: true }));
    }
  });
});
app.delete("/:id", (req, res) => {
  const statement = `delete from cricketer where personid=${req.params.id}`;
  connection.query(statement, (err, result) => {
    if (result){
      sms(`hey patil ::${req.params.id} is been deleted`).then((msg)=>{console.log(msg)}).catch((err)=>{console.log(err)});
      res.send(JSON.stringify({ status: true }));
    }
    else res.send(JSON.stringify({ status: false }));
  });
});
app.put("/:id", (req, res) => {
    console.log(req.body)
  const statement = `update cricketer set fname='${req.body.name}' ,age='${req.body.age}', role='${req.body.role}' ,
  pic='${req.body.pic}' where personid=${req.params.id}`;
  connection.query(statement,(err,result)=>{
    if(result){
      sms(` hey patil ::${req.body.name} is been updated`).then((msg)=>{console.log(msg)}).catch((err)=>{console.log(err)});
      res.send(JSON.stringify({ status: true }));
    } 
    else res.send(JSON.stringify({ status: false }));
  })
});
module.exports = app;
