const express = require('express');
const app = new express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const UserRoute = require('./routes/users');
const PostRoute = require('./routes/posts');
dotenv.config(); //init .env
app.use(express.json()); //able to send json over body
mongoose.connect(process.env.MONGO_URL, {
        connectTimeoutMS: 1000
    }).then(console.log("connected"))
    .catch((err) => console.log(err))

app.use("/api/auth", authRouter)
app.use("/api/users", UserRoute)
app.use("/api/posts", PostRoute)

app.listen("5000", () => {
    console.log("running")
});