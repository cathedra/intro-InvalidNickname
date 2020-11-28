const mongoose = require("mongoose")

const Role = require("./role.model")

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({name: "user"})
                .save(err => {
                    if (err) {
                        console.log("error", err);
                    }
                    console.log("added 'user' to roles collection");
                });
            new Role({name: "moderator"})
                .save(err => {
                    if (err) {
                        console.log("error", err);
                    }
                    console.log("added 'moderator' to roles collection");
                });
            new Role({name: "admin"})
                .save(err => {
                    if (err) {
                        console.log("error", err);
                    }
                    console.log("added 'admin' to roles collection");
                });
        }
    });
}

mongoose.connect("mongodb://localhost/todo-app", {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    initial()
})
mongoose.set("debug", true)
mongoose.Promise = Promise

module.exports.User = require("./user.model")
module.exports.Role = Role
module.exports.Todo = require("./todo.model")
module.exports.ROLES = ["user", "admin", "moderator"]