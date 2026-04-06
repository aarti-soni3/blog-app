const User = require('../models/UserSchema')

const userData = [
    {
        name: 'art',
        username: 'art',
        gender: 'female',
        phone: 9409937378,
        email: 'art@gmail.com',
        password: 'art@1234',
        address: 'vsdvndssvo',
        city: "jamnagar",
        state: "gujrat",
        zip: 444444,
    },
    {
        name: 'rt',
        username: 'rt',
        gender: 'female',
        phone: 9408837378,
        email: 'rt@gmail.com',
        password: 'rt@12345',
        address: 'dvcspdnvsod vsdvndssvo',
        city: "khachrod",
        state: "madhya pradesh",
        zip: 222222,
    },
    {
        name: 'aarti',
        username: 'aarti',
        gender: 'female',
        phone: 9009937378,
        email: 'aarti@gmail.com',
        password: 'aarti@123',
        address: 'sdfonhsdos dvcspdnvsod vsdvndssvo',
        city: "ahmedabad",
        state: "gujrat",
        zip: 111111,
    },
]
    ;

const createData = async () => {
    try {
        await User.bulkCreate(userData, { individualHooks: true })
    } catch (error) {
        console.log(error)
    }
}

createData();