var mongoose = require("mongoose");


// schema setup
var todoListSchema = new mongoose.Schema({
    name: String,
    created: {type: Date, default: Date.now}
})

module.exports = mongoose.model("Todolist", todoListSchema);