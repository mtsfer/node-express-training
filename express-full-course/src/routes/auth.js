const express = require('express');
const passport = require('passport');
require('../strategies/discord-strategy');
// require('../strategies/local-strategy');

const router = express.Router();

router.post('/', passport.authenticate('local'), (req, res) => {
    res.sendStatus(200);
});

router.get('/discord', passport.authenticate('discord'), (req, res) => {
    res.sendStatus(200);
});

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
    res.sendStatus(200);
});

router.get('/status', (req, res) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: 'Not Authenticated' });
    }
    return res.status(200).json(user);
});

router.post('/logout', (req, res) => {
    if (!req.user) {
        return res.status(401).send({ message: 'Not Authenticated' });
    }
    req.logout((err) => {
        if (err) {
            return res.status(401).send({ message: err.message });
        }
        return res.sendStatus(200);
    });
});

module.exports = router;
