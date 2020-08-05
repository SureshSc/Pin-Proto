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
    const enteredDigits = req.params.Digits
    console.log(enteredDigits)
    const response = new VoiceResponse();
    response.say(`Entered PIN is ${enteredDigits}`)
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


///twilio/complete?AccountSid=AC783d892f16b3ceed0145d98370e10131&ApiVersion=2010-04-01&CallSid=CA65a1e6aef21760e34e75e4fe73c07716&CallStatus=in-progress&Called=%2B12248033558&CalledCity=&CalledCountry=US&CalledState=IL&CalledVia=%2B49494949494912248033558&CalledZip=&Caller=%2B49221669549907&CallerCity=&CallerCountry=DE&CallerState=K%C3%B6ln&CallerZip=&Digits=123456&Direction=inbound&FinishedOnKey=&ForwardedFrom=%2B49494949494912248033558&From=%2B49221669549907&FromCity=&FromCountry=DE&FromState=K%C3%B6ln&FromZip=&To=%2B12248033558&ToCity=&ToCountry=US&ToState=IL&ToZip=&msg=Gather+End" host=pin-proto.herokuapp.com request_id=d3d57a44-520a-42d0-9acf-3279788aa90a fwd="54.198.119.84" dyno=web.1 connect=1ms service=9ms status=200 bytes=290 protocol=https