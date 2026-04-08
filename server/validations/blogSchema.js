const Category = require("../models/CategorySchema");

module.exports.createBlogSchema = {
    title: {
        isLength: {
            options: { min: 2, max: 40 },
            errorMessage: 'Title should be between 2 to 40 character'
        },
        notEmpty: { errorMessage: 'Title is required' }
    },
    description: {
        notEmpty: { errorMessage: 'Description is required' },
        isLength: {
            options: { min: 10 },
            errorMessage: 'description must be more than 10 charater long'
        }
    },
    category: {
        custom: {
            options: async (value, { req }) => {

                if (!value)
                    throw new Error('Category is required');

                const category = await Category.findOne({ where: { name: value } });

                if (!category)
                    throw new Error('Invalid Category!');

                req.categoryId = category.categoryId
            }
        }
    },
}

module.exports.updateBlogSchema = {
    title: this.createBlogSchema.title,
    description: this.createBlogSchema.description,
    category: this.createBlogSchema.category,
    isDeleteImage: {
        notEmpty: { errorMessage: "isDeleteImage parameter is required for image!" }
    }
}