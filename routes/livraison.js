const express = require('express');
var router = express.Router();
var db = require("../core/db");

router.get('/:CardCode', (req, res, next) => {
    const CardCode = req.params.CardCode;
    db.executeSql('select * from  V_Situation_Livraisons  where  TRY_CONVERT(int, cardcode)= ' + CardCode, (error, result) => {
        if (error) throw error;
        res.send(result);
    });

});


router.get('/livraisondetails', (req, res, next) => {
    db.executeSql('select * from V_Situation_Livraisons_details', (error, result) => {
        if (error) throw error;
        res.send(result);
    });

});

module.exports = router;
