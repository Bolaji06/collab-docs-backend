import { ValidationError } from '../utils/errors.js';
export const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            const errors = error.errors?.map((err) => ({
                field: err.path.join('.'),
                message: err.message,
            }));
            console.log(error);
            next(new ValidationError(JSON.stringify(errors)));
        }
    };
};
//# sourceMappingURL=validator.js.map