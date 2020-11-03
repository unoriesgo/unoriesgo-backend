const express = require("express");
const cors = require("cors");
const app = express();
const userrouter = require("./routes/user");
const recursosrouter = require("./routes/recursos");

require("./database");

// settings
app.set("port", process.env.PORT || 4000);

// middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// Add headers
app.use(function(req, res, next) {
    // Website you wish to allow to connect
    res.setHeader(
        "Access-Control-Allow-Origin",

        "*"
    );
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    // res.setHeader(
    //     "Access-Control-Allow-Origin",

    // );
    // Request methods you wish to allow
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );

    // Request headers you wish to allow
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type"
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);

    // Pass to next layer of middleware
    next();
});

// routes
app.use("/api", userrouter);
app.use("/api", recursosrouter);
//app.use("/api/recursos", require("./routes/recursos"));

app.listen(app.get("port"));
console.log("Server on port", app.get("port"));