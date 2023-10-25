// Task1: initiate app and run server at 3000
const express=require('express');
const morgan = require('morgan');
const app = new express;
app.use(morgan('dev'));
require('dotenv').config();
app.use(express.json());// what data type we are posting
const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
// Task2: create mongoDB connection 

require('./db/connect');

const ObjectId = require('mongodb').ObjectId;
//Task 2 : write api with error handling and appropriate api mentioned in the TODO below

const empData=require('./model/EmployeeData');
const { request } = require('http');





//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist',async(req,res)=>{
    try {
        const data=await empData.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(400).json(error);
    }
});


//TODO: get single data from db  using api '/api/employeelist/:id'


app.get('/api/employeelist/:id',async(req,res)=>{
    try {
         let query={_id: new ObjectId(req.params.id)}
        let result = await empData.findOne(query);
         res.status(200).json(result);
     } catch (error) {
        res.status(400).json(error);
    }
 })


//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async(req,res)=>{
    try{
        var item=req.body;
        console.log("items in body : "+item);
        const Data= new empData(item);
        console.log("data saved is :"+Data);
        const savedata= await Data.save();
        res.status(200).json('Post Successfull')
    }
    catch(error){
        res.status(404).json('Error!!')
    }
   
})




//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id',async(req,res)=>{
    try {
        const query = { _id: new ObjectId(req.params.id) };
        let result = await empData.deleteOne(query);
        res.status(200).json('Deleted Successfully')
    } catch (error) {
        res.status(404).json('Error!!')
    }
})



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put("/api/employeelist", async (req, res) => {
    try {
        
        console.log("selected id is :"+req.query.id);
        const query = { _id: new ObjectId(req.body._id) };
        console.log("requested body is :"+req.body._id);
        let result = await empData.updateOne(query, { $set: req.body });
        res.send(result).status(200);
    } catch (error) {
        res.status(404).json('Error!!')
    }
   
  });



//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});


const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`);
})