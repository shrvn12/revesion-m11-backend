const express = require('express');
const { noteModel } = require('../models/note.model');

const noteRouter = express.Router();

noteRouter.post('/createNote',async (req, res) => {
    const {body, title} = req.body;

    const payload = {body, title};

    payload.date = new Date().toDateString();

    for(let elem in payload){
        if(!payload[elem]){
            return res.status(403).send({msh:`Please provide ${elem}`});
        }
    }

    const note = new noteModel(payload);

    await note.save();

    res.status(201).send({msg:'Note Created'});

})

noteRouter.get('/getNote',async (req, res) => {
    const data = await noteModel.find();
    res.status(200).send(data);
})

noteRouter.patch('/edit/:id',async (req, res) => {
    const {body, title} = req.body;

    const payload = {body, title};

    payload.date = new Date().toDateString();

    let id = req.params.id;
    if(id.length < 24){
        return res.status(400).send({msg:'Invalid ID'});
    }
    await noteModel.findByIdAndUpdate(id, payload);
    res.sendStatus(204);
})

noteRouter.delete('/delete/:id',async (req, res) => {
    let id = req.params.id;
    if(id.length < 24){
        return res.status(400).send({msg:'Invalid ID'});
    }
    await noteModel.findByIdAndDelete(id);
    res.sendStatus(204);
})

module.exports = {
    noteRouter
}