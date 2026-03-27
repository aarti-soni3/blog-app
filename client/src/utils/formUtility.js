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
};
