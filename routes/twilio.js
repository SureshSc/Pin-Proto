var express = require('express');
var router = express.Router();

const VoiceResponse = require('twilio').twiml.VoiceResponse;


router.post('/enterpin', function(req, res, next) {
    const response = new VoiceResponse();
    const gather = response.gather({
        action: '/twilio/complete',
        method: 'GET',
        numDigits: 6
    });
    gather.say('Enter your 6 digit pin after the message');
    response.redirect({
        method: 'GET'
    }, '/twilio/result');
    
    console.log(response.toString());
    res.set('Content-Type', 'text/xml');
    res.send(response.toString())
});

router.get('/complete', function(req, res, next) {
    console.log(req.params)
    const response = new VoiceResponse();
    response.say("Entered PIN is 111111")
    res.set('Content-Type', 'text/xml');
    res.send(response.toString())
});

router.get('/result', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/error', function(req, res, next) {
    res.send('Failed to give in put');
});
  
router.get('/', function(req, res, next) {
    res.send('Welcome to Twilio');
});
  

module.exports = router;
