const express = require('express');
var router = express.Router();
var db = require("../core/db");

router.get('/commades/cd/:CardCode', (req, res, next) => {
    const CardCode = req.params.CardCode;
    db.executeSql('select * from  V_Situation_Commandes  where  TRY_CONVERT(int, cardcode) = '+CardCode, (error, result) => {
        if (error) throw error;
        res.send(result);
    });

});

router.get('/commadesdetails/:DocEntry', (req, res, next) => {
    const DocEntry = req.params.DocEntry;
    db.executeSql('select * from V_Situation_Commandes_details where DocEntry like ' + DocEntry, (error, result) => {
        if (error) throw error;
        res.send(result);
    });

});

module.exports = router;
