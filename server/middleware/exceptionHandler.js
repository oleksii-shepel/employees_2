import { ValidationError } from "sequelize";

const exceptionHandler = (err, req, res, next) => {

    if (err instanceof ValidationError) {
        let result = { success: false, message: "Validation failed" };

        if (err.errors.length) {
            result.fails = {};
            err.errors.forEach(errorItem => {
                result.fails[errorItem.path] = [];
            });

            err.errors.forEach(errorItem => {
                result.fails[errorItem.path].push(errorItem.message);
            });
        }
        res.status(422).json(result);
    }

    if (err instanceof Error) {
        if (err.message.includes("Token is not valid.")) {
            res.status(401).json({ success: false, message: "The token expired." });
            next();
            return;
        }

        res.status(500).json({ success: false, message: err.message });
    }

    next();
}

export default exceptionHandler;