const Category = require('../models/CategorySchema')

const categories = [
    { "name": "Technology" },
    { "name": "Travel Guides" },
    { "name": "Health & Fitness" },
    { "name": "Digital Marketing" },
    { "name": "Finance & Investing" },
    { "name": "Lifestyle & Culture" },
]

const createData = async () => {
    try {
        await Category.bulkCreate(categories)
    } catch (error) {
        console.log(error);
    }
}

createData();