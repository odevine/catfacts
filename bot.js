var HTTPS = require('https'),
    botID = process.env.BOT_ID,
    myArray = require('./catfactarray.js'),
    factNumber = 1;

function respond() {
    var request = JSON.parse(this.req.chunks[0]),
        botRegex = /catfacts/i;

    if(factNumber == 13) {
        factnumber = 1;
    }

    if(request.text && botRegex.test(request.text)) {
        this.res.writeHead(200);
        // wait at least 500ms before posting
        setTimeout(function() {
            postMessage(factNumber);
            console.log('posted!')
        }, 500);
        this.res.end();
        factNumber++;

    } else {
        console.log("not a valid message to respond to");
        this.res.writeHead(200);
        this.res.end();
    }
}

function postMessage(n) {
    var rand, options, body, botReq;

    rand =  myArray[Math.floor(Math.random() * myArray.length)];

    

    options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    };

    body = {
        "bot_id": botID,
        "text": rand
    };

    console.log('sending ' + rand + ' to ' + botID);

    botReq = HTTPS.request(options, function(res) {
        if(res.statusCode == 202) {
            //neat
        } else {
            console.log('rejecting bad status code ' + res.statusCode);
        }
    });

    botReq.on('error', function(err) {
        console.log('error posting message '  + JSON.stringify(err));
    });

    botReq.on('timeout', function(err) {
        console.log('timeout posting message '  + JSON.stringify(err));
    });

    botReq.end(JSON.stringify(body));
}

exports.respond = respond;