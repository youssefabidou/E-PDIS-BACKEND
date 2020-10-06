const express = require('express');
var router = express.Router();
var db = require("../core/db");
router.get('/:user', (req, res, next) => {
    const user = req.params.user;
    db.executeSql('select * from KP_Authentification  where  TRY_CONVERT(int, TEL)= '+user, (error, result) => {
        if (error) throw error;
        res.send(result);
    });

});
router.get('/', (req, res, next) => {
    const user = req.params.user;
    db.executeSql('select verificationcode from KP_Authentification  ', (error, result) => {
        if (error) throw error;
        res.send(result);
    });

});

module.exports = router;