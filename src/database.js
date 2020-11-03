const mongoose = require("mongoose");
require("dotenv").config();
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then((db) => console.log("Database is connected"))
    .catch((err) => console.log(err));
//connect to mongodb atlas