var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var todoSchema = new Schema({

    userid: {
        type: String,
        required: true,
        unique: true
    },
    todos: [{

        title: {
            type: String
        },
        status: {
            type: Boolean
        }
    }]
})
module.exports = mongoose.model('todo',todoSchema);