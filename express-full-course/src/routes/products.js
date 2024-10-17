const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.headers.cookie);
    console.log(req.cookies);
    console.log(req.signedCookies['hello']);
    if (req.signedCookies['hello'] && req.signedCookies['hello'] === 'world') {
        return res.status(200).send([{ id: 123, name: 'Chicken Breast', price: 12.99 }]);
    }
    res.status(401).send({ message: 'Sorry. You need the correct cookie.' });
});

module.exports = router;
