const Comment = require('../models/CommentSchema')

const commentData = [
    {
        "userId": "f0f16540-f0d9-4953-a8f0-69f5ec5e1302",
        "blogId": "0f6567f7-8739-4746-8b55-ebb7223a958f",
        "description": "This post is packed with useful information I could implement immediately.",
    },
    {
        "userId": "5475abaf-79d8-49ce-aed3-2e2a70fef248",
        "blogId": "1d83e1c6-faee-460a-bb5e-86766c02b1ba",
        "description": "I hadn’t thought about this particular thing you pointed out, and it will help me.",
    },
    {
        "userId": "09f21574-9896-4835-b8a3-20da4f317c05",
        "blogId": "3ecb4e03-6238-4e45-a9ff-5480fbf351f6",
        "description": "Spot on about how consumption helps with creation.",
    },
    {
        "userId": "f0f16540-f0d9-4953-a8f0-69f5ec5e1302",
        "blogId": "47d09b83-3ef5-434d-be6c-30f42f528cad",
        "description": "Thanks for sharing such an insightful look into this topic.",
    },
    {
        "userId": "5475abaf-79d8-49ce-aed3-2e2a70fef248",
        "blogId": "0f6567f7-8739-4746-8b55-ebb7223a958f",
        "description": "Definitely going to apply these tips to my own blogging journey!",
    },
    {
        "userId": "09f21574-9896-4835-b8a3-20da4f317c05",
        "blogId": "3ecb4e03-6238-4e45-a9ff-5480fbf351f6",
        "description": "This is a great read and I really appreciate the perspective you shared.",
    },
    {
        "userId": "f0f16540-f0d9-4953-a8f0-69f5ec5e1302",
        "blogId": "0f6567f7-8739-4746-8b55-ebb7223a958f",
        "description": "I love the way you express your ideas here.",
    },
    {
        "userId": "5475abaf-79d8-49ce-aed3-2e2a70fef248",
        "blogId": "1d83e1c6-faee-460a-bb5e-86766c02b1ba",
        "description": "This was exactly what I was searching for as a beginner.",
    },
    {
        "userId": "09f21574-9896-4835-b8a3-20da4f317c05",
        "blogId": "3ecb4e03-6238-4e45-a9ff-5480fbf351f6",
        "description": "Such a well-written post, keep up the hard work!",
    },
    {
        "userId": "f0f16540-f0d9-4953-a8f0-69f5ec5e1302",
        "blogId": "47d09b83-3ef5-434d-be6c-30f42f528cad",
        "description": "Thanks for giving us something thoughtful to consider today.",
    },
]
    ;

const createData = async () => {
    try {
        await Comment.bulkCreate(commentData)
    } catch (error) {
        console.log(error)
    }
}

createData();