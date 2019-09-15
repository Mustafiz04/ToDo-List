var express = require("express"),
    bodyparser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOveride = require("method-override");

    Todolist = require("./model/todo");


app = express();
mongoose.connect("mongodb://localhost/todo", { useNewUrlParser: true});
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(methodOveride("_method"));
app.use(express.static(__dirname + "/public"));

// index page
app.get("/" , (req, res) => {
    Todolist.find({}, (err, todo) => {
        if(err){
            console.log(err);
        }else{
            res.render("index", {alltodo: todo});
        }
    })
})

app.post("/", (req, res) => {
    var name = req.body.name;

    var newTodo = {name: name};
    // console.log(newTodo);

    Todolist.create(newTodo, (err, newlyTodo) => {
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
        }
    })
})

// Delete Route
app.delete("/:id", (req, res) => {
    // req.params.id = this._id;
    Todolist.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            console.log(err);
        }else{
            res.redirect("/");
        }
    })
})

var PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));















// Todolist.create(
//     {
//         name: "Gym"
//     }, function(err, todo){
//         if(err){
//             console.log(err);
//         }else{
//             console.log(todo);
//         }
//     }
// )