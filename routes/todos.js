var Router = require('express').Router();
var TODO = require('../models/model_todos');

Router.get('/', function (req, res) {
    console.log('GET Request')
    TODO.find({},{_id:0,__v:0} ,function (err, data) {
        if (err) {
            res.status(500).send({ status: "err", message: "DB error" });
        }
        else {
            res.status(200).send(data);
        }
    });
})

Router.get('/:id', function (req, res) {
    var id = req.params.id;
    TODO.findOne({ userid: id }, function (err, data) {
        if (err) {
            res.status(500).send({ status: "err", message: "DB error" });
        }
        else {
            res.status(200).send(data);
        }
    });
})

Router.delete('/:id', function (req, res) {
    var id = req.params.id;
    TODO.deleteOne({ userid: id }, function (err, data) {
        if (err) {
            res.status(500).send({ status: "err", message: "DB error" });
        }
        else {
            res.status(200).send(data);
        }
    });
})
Router.post('/', function (req, res) {
    var body = req.body;
    var todoObj = new TODO(body);
    todoObj.save(function (err, data) {
        if (err) {
            res.status(500).send({ status: "err", message: "DB error" });
        }
        else {
            res.status(200).send(data);
        }
    })
})
Router.put('/:id', function (req, res) {
    var id = req.params.id;
    var body = req.body;
    TODO.findOneAndUpdate({userid: id },{todos:body.todos},function (err, data) {
        if (err) {
            res.status(500).send({ status: "err", message: "DB error" });
        }
        else {
            res.status(200).send(data);
        }
    })
})


module.exports=Router
