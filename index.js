const express = require('express');
const app = new express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const UserRoute = require('./routes/users');
const PostRoute = require('./routes/posts');
const CategoryRoute = require('./routes/categories');
const multer = require('multer');
dotenv.config(); //init .env
app.use(express.json()); //able to send json over body
mongoose.connect(process.env.MONGO_URL, {
        connectTimeoutMS: 1000
    }).then(console.log("connected"))
    .catch((err) => console.log(err))
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
})
const upload = multer({ storage: storage });

app.post("/api/uploads", upload.single("file"), (req, res) => {
    res.status(200).json("success uploaded");
});
app.use("/api/auth", authRouter)
app.use("/api/users", UserRoute)
app.use("/api/posts", PostRoute)
app.use("/api/categories", CategoryRoute)

app.listen("5000", () => {
    console.log("running")
});