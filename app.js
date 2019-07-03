const express = require('express');
var app = express();
const PORT=process.env.PORT ||8081;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var url = 'mongodb://localhost:27017/uapplication'
var url = 'mongodb://uapp:uapp123@ds243717.mlab.com:43717/uapplication'
var request = require('request');
//const authUrl = 'http://localhost:4200/authapp/v1/auths/validate';
const authUrl = 'https://todoauth.herokuapp.com/authapp/v1/auths/validate';

mongoose.connect(url,{ useNewUrlParser: true }, function (err) {
    if (err) {
        console.log(err)
    }
    else {
        console.log(`application connected to ${url}`)
    }
});

var todos = require('./routes/todos');
app.use(function (req, res, next) {
    
    
    console.log('request came to the url:'+req.url)
    if (req.headers.authorization) {
        request.post({ url: authUrl,headers:req.headers,json:true}, function (err, respObject,body) {
            if(err){
                 console.log('err in todo') 
                res.status(500).send({status:'error',message:'Auth server is down'});
            }
            else if(body.success){
                 console.log('success in todo') 
                next();
            }
            else{
                 console.log('success in body') 
                res.status(400).send(body)
            }
            
        });
    } else {
        
       
    console.log('request came without token') 
        
        res.status(400).send('Authorization token is missing');
    }
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use('/uapp/v1/todos', todos);

app.listen(PORT);

console.log("server started");
