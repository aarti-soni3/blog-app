export const userValidationSchema = {
    name: {
        minLength: 2,
        maxLength: 20,
        required: "Name is required",
    },
    username: {
        minLength: 2,
        maxLength: 20,
        required: "Username is required",
    },
    phone: {
        minLength: 10,
        maxLength: 10,
        required: "Please enter valid phone number",
    },
    email: {
        pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Please enter valid Email-id",
        },
        required: "Email is required",
    },
    password: {
        required: "Password is required",
        minLength: {
            value: 8,
            message: "Must be 8 character long",
        },
        pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            message: "Must contain lowercase, uppercase & numbers!",
        },
    },
    address: {
        required: "Address is required",
    },
    city: {
        maxLength: {
            value: 50,
            message: 'Please enter valid city name...it must be less than 50 characters!'
        },
        pattern: {
            value: /^[A-Za-z]+$/i,
            message: 'Please enter valid city name'
        },
        required: 'city is required'
    },
    state: {
        maxLength: {
            value: 50,
            message: 'Please enter valid city name...it must be less than 50 characters!'
        },
        pattern: {
            value: /^[A-Za-z]+$/i,
            message: 'Please enter valid city name'
        },
        required: 'state is required'
    },
    zip: {
        length: {
            ars: [6,6],
            message: `Postal code length must be 6 digits`,
        },
        pattern: {
            value: /^[0-9]*$/,
            message: 'Only digit allowed',
        },
        required: 'Postal code is required'
    }
};

export const blogValidationSchema = {
    title: {
        required: "Title is required",
        minLength: {
            value: 3,
            message: 'Title must be more than 3 characters!'
        },
        maxLength: {
            value: 40,
            message: 'Title must be less than 40 characters!'
        },
    },
    image: {
        required: "Image is required",
    },
    description: {
        required: "Description is required",
        minLength: {
            value: 5,
            message: "Description must be at least 5 characters"
        },
    },
};

export const commentValidationSchema = {
    description: {
        required: "Write anything to post comment!",
        minLength: {
            value: 2,
            message: "Description must be at least 2 characters"
        },
        maxLength: {
            value: 60,
            message: 'Title must be less than 60 characters!'
        },
    },
}