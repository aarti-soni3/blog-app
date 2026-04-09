//schema specifications for express validator

module.exports.registerSchema = {
    name: {
        notEmpty: { errorMessage: 'Name is required' }
    },
    username: {
        notEmpty: { errorMessage: 'Username is required' }
    },
    gender: {
        notEmpty: { errorMessage: 'Gender is required' }
    },
    phone: {
        isLength: {
            options: { min: 10, max: 10 },
            errorMessage: 'Phone number must be 10 digit!'
        },
        notEmpty: { errorMessage: 'Phone is required' }
    },
    email: {
        normalizeEmail: true,
        isEmail: { errorMessage: 'Invalid Email-id' },
        notEmpty: { errorMessage: 'Email is required' }
    },
    password: {
        isLength: {
            options: { min: 8, max: 255 },
            errorMessage: 'Password should be at least 8 characters long'
        },
        matches: {
            options: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/,
            errorMessage: 'Password must contain lowercase, uppercase & numbers!'
        },
        notEmpty: { errorMessage: 'Password is required!' }
    },
}

module.exports.loginSchema = {
    email: { ...this.registerSchema.email },
    password: { ...this.registerSchema.password },
}