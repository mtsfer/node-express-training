const express = require('express');
const userValidationSchema = require("../utils/validation-schemas")
const controller = require("../controllers/user-controller");
const validate = require("../middlewares/validator");

const router = express.Router();

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await controller.getUserById(id);
        return res.status(200).json(user);
    } catch (err) {
        next(err);
    }
});

router.post('/', validate(userValidationSchema), async (req, res, next) => {
    try {
        const user = await controller.createUser(req.body);
        return res.status(201).json(user);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', validate(userValidationSchema), async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedUser = await controller.updateUser(id, req.body);
        return res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        await controller.deleteUser(id);
        return res.status(204).end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;
