const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: String,
    body: String,
    date: String
})

const noteModel = mongoose.model('notes',noteSchema);

module.exports = {
    noteModel
}