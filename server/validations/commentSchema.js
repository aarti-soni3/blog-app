module.exports.createCommentSchema = {
    id: {
        notEmpty: { errorMessage: 'blog id must be required' }
    },
    description: {
        isLength: {
            options: { min: 2, max: 60 },
            errorMessage: 'comment must be between 2 to 60 characters!'
        },
        notEmpty: { errorMessage: 'Comment Description is required' }
    }
}

module.exports.updateCommentSchema = {
    description: this.createCommentSchema.description
}