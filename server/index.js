if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const { connectMySQLDatabase } = require('./config/db');
const authRouter = require('./routes/authRouter');
const blogRouter = require('./routes/blogRouter');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const app = express();
const port = process.env.PORT || 3000;

connectMySQLDatabase();

const corsConfig = {
    origin: 'http://localhost:5173'
}

app.use(cors(corsConfig))
app.use(express.json())

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/category", categoryRouter);


app.listen(port, () => {
    console.log(`server is listening on : ${port}`);
})