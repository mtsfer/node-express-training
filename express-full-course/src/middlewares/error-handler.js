const errorHandler = (err, req, res, next) => {
    if (err.statusCode) {
        res.status(err.statusCode).json({ message: err.message });
    } else {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const routeNotFoundHandler = (req, res, next) => {
    res.status(404).send({ message: 'Not Found' });
};

module.exports = { errorHandler, routeNotFoundHandler };
