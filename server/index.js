if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
//for different url of frontend n backend
const cors = require('cors');

const { connectMySQLDatabase } = require('./config/db');

//all routers
const authRouter = require('./routes/authRouter');
const blogRouter = require('./routes/blogRouter');
const userRouter = require('./routes/userRouter');
const categoryRouter = require('./routes/categoryRouter');
const commentRouter = require('./routes/commentRouter');

const app = express();
const port = process.env.PORT || 3000;

//connect to db
connectMySQLDatabase();

const corsConfig = {
    origin: 'http://localhost:5173'
}

app.use(cors(corsConfig))

//middleware for form data
app.use(express.json())

//all routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/comments", commentRouter);


app.listen(port, () => {
    console.log(`server is listening on : ${port}`);
})