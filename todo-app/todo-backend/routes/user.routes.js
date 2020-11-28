const {authJwt} = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get("/todos", [authJwt.verifyToken], controller.getTodos)

    app.post("/todos", [authJwt.verifyToken], controller.postTodo)

    app.put("/todos/:id", [authJwt.verifyToken], controller.editTodo)

    app.delete("/todos/:id", [authJwt.verifyToken], controller.deleteTodo)
};