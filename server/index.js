const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/db');
const authRouter = require('./routes/authRouter');
const postRouter = require('./routes/postRouter');
const userRouter = require('./routes/userRouter');
const app = express();
const port = 3000;

connectDatabase();

const corsConfig = {
    origin: 'http://localhost:5173'
}

app.use(cors(corsConfig))
app.use(express.json())

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);


app.listen(port, () => {
    console.log(`server is listening on : ${port}`);
})