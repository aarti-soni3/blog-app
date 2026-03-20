const express = require('express');
const connectDatabase = require('./config/db');
const authRouter = require('./routes/authRouter');
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');
const app = express();
const port = 3000;

connectDatabase();

app.use("/api/auth", authRouter);
app.use("/api/users", authRouter);
app.use("/api/posts", authRouter);


app.listen(port, () => {
    console.log(`server is listening on : ${port}`);
})