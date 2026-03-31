const Category = require('../models/CategorySchema')

const categories = [
    {
        // "category_id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Technology"
    },
    {
        // "category_id": "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        "name": "Travel Guides"
    },
    {
        // "category_id": "7d9b9a62-4217-4581-9b98-d1a1532824e4",
        "name": "Health & Fitness"
    },
    {
        // "category_id": "2f9b8c3a-d1e5-4f7a-8b1c-9d0a7e3f2g1h",
        "name": "Digital Marketing"
    },
    {
        // "category_id": "9a3b8c7d-e6f5-4a4b-9c2d-1e0f3g4h5i6j",
        "name": "Lifestyle & Culture"
    },
    {
        // "category_id": "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
        "name": "Finance & Investing"
    }
]

const createData = async () => {
    try {
        await Category.bulkCreate(categories)
    } catch (error) {
        console.log(error);
    }
}

createData();