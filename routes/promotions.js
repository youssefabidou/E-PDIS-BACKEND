var express = require('express');
var router = express.Router();
var db = require("../core/db");
var moment = require('moment');


router.get('/:zone/:groupe', (req, res, next) => {
    const zone = req.params.zone;
    const groupe = req.params.groupe;
    var datetime = new Date();
    var DT = moment(datetime).format('MM-DD-YYYY');
    db.executeSql("SELECT * from KAPI_promo where zone = '"+zone+"' and groupe = '"+groupe+"' and date_de_fin >= '" + DT +"' order by date_de_debut DESC", (error, result) => {
        if (error) throw error;
        res.send(result);
    });
});

router.post('/', (req, res) => {
    var data = {
        text: req.body.text,
        image: req.body.image,
        date_de_debut: req.body.date_de_debut,
        date_de_fin: req.body.date_de_fin,
        zone: req.body.zone,
        groupe: req.body.groupe
    }
    var DD = moment(data.date_de_debut).format('MM-DD-YYYY');
    var DF = moment(data.date_de_fin).format('MM-DD-YYYY');

    db.executeSql("insert into KAPI_promo (text ,image, date_de_debut, date_de_fin, zone, groupe ) VALUES ('" + data.text + "','" + data.image + "','" + DD + "','" + DF + "','" + data.zone + "','" + data.groupe + "')", (error, result) => {
        if (error) throw error;
        res.send(result);
    });

});

module.exports = router;


