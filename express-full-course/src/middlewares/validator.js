const { checkSchema } = require('express-validator');

const validate = (schema) => {
    return async (req, res, next) => {
        const result = await checkSchema(schema).run(req);
        const errors = result.map((errors) => errors.array()).flat();
        if (errors.length > 0) {
            return res.status(422).json({errors: errors});
        }
        next();
    }
}

module.exports = validate;
