const User = require('../models/UserSchema')

const userData = [
    {
        name: 'art',
        username: 'art',
        gender: 'female',
        phone: 9409937378,
        email: 'art@gmail.com',
        password: 'art@1234',
        address: 'sdfonhsdos dvcspdnvsod vsdvndssvo'
    },
    {
        name: 'rt',
        username: 'rt',
        gender: 'female',
        phone: 9408837378,
        email: 'rt@gmail.com',
        password: 'rt@12345',
        address: 'sdfonhsdos dvcspdnvsod vsdvndssvo'
    },
    {
        name: 'aarti',
        username: 'aarti',
        gender: 'female',
        phone: 9009937378,
        email: 'aarti@gmail.com',
        password: 'aarti@123',
        address: 'sdfonhsdos dvcspdnvsod vsdvndssvo'
    },
]
    ;

const createData = async () => {
    try {
        await User.bulkCreate(userData)
    } catch (error) {
        console.log(error)
    }
}

createData();