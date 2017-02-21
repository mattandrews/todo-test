var express = require('express');
var router = express.Router();
var moment = require('moment');

var messages = [];

var cleanupMsg = function (msg) {
    console.log(msg.date);
    var newDate = moment(msg.date).format('hh:mm:ss a');
    return {
        text: msg.text,
        date: newDate
    };
};

/* GET home page. */
router.get('/', function (req, res, next) {
    var cleanedMessages = messages.map(cleanupMsg);
    res.render('index', { title: 'Express', messages: cleanedMessages });
});

router.post('/test', function (req, res, next) {

    if (req.body.something) {
        messages.push({
            text: req.body.something,
            date: new Date()
        });
        res.status(200).send({
            status: 'success'
        });
    } else {
        res.status(400).send({
            status: 'error'
        });
    }
});

module.exports = router;
