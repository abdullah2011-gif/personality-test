
const dotenv = require("dotenv");
dotenv.config();
var express = require("express");
var morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./utils/Error");
var indexRouter = require("./routes/index");
const path = require("path");
const dbFunctions = require('./db/dbFunctions');
const { existsSync } = require("fs");
// const db = require('./db/db.json')
const server = async () => {
    try {
        if (!existsSync("src/db/db.json"))
            dbFunctions.init()
        var app = express();
        app.use(cors());
        app.use(express.static(path.resolve(__dirname, "..", "admin/build")));
        app.use(morgan("dev"));
        app.use(express.json({ limit: "50mb" }));
        app.use(express.urlencoded({ extended: false }));
        app.use("/api", indexRouter);

        app.get("/*", (req, res) => {
            res.sendFile(path.resolve(__dirname, "..", "client/build", "index.html"));
        });
        app.use(errorHandler);
        var port = process.env.PORT || 5002;
        app.listen(port, (err) => {
            console.log("app is listening on port " + port);
        });
    } catch (error) {
        console.log(error);
    }
};
server();