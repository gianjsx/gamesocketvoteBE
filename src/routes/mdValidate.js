import {
    body,
    validationResult
} from 'express-validator';

export const validateRules = () => {
    return [
        body("nombre", "Nombre no puede estar vacio").not().isEmpty()
    ];
};

export const validate = (req, res, next) => {
    const errorsVal = validationResult(req);
    if (errorsVal.isEmpty()) {
        return next();
    }
    let message = [];
    let params = [];

    errorsVal.array().map(item => {
        message.push(item.msg);
        params.push(item.param);
    });
    return res.status(422).json({
        ok: false,
        validate: true,
        message,
        params
    });
}