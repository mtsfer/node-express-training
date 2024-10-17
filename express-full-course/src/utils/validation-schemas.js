const userValidationSchema = {
    username: {
        notEmpty: {
            errorMessage: 'Username must not be empty',
        },
        isLength: {
            options: {min: 5, max: 32},
            errorMessage: 'Username must be 5-32 characters long',
        },
        isString: {
            errorMessage: 'Username must be a string',
        }
    },
    displayName: {
        notEmpty: true
    },
    password: {
        notEmpty: true,
    },
};

module.exports = userValidationSchema;
