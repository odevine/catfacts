var HTTPS = require('https'),
    botID = process.env.BOT_ID,
    factNumber = 1;

function respond() {
    var request = JSON.parse(this.req.chunks[0]),
        botRegex = /cat/i;

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
    var currentResponse, options, body, botReq, cat1, cat2, cat3, cat4, cat5, cat6, cat7, cat8, cat9, cat10, cat11, cat12, cat13, cat14;

    cat1 = 'Cats use their tails for balance and have nearly 30 individual bones in them!'
    cat2 = 'In ancient Egypt killing a cat was a crime punishable by death. '
    cat3 = 'Did you know that the first cat show was held in 1871 at the Crystal Palace in London? Mee-wow!'
    cat4 = 'Did you know there are about 100 distinct breeds of domestic cats? Plenty of furry love!'
    cat5 = 'Cats bury their feces to cover their trails from predators.'
    cat6 = 'Cats are Americas most popular pets: There are 88 million cats compared to 74 million dogs.'
    cat7 = 'Some cats have survived falls from over 32 stories onto concrete, due largely to their "Righting reflex."'
    cat8 = 'Every year, nearly four million cats are eaten in China as a delicacy.'
    cat9 = 'Cats have 32 Muscles that control the outer ear while humans have only 6. '
    cat10 = 'A cat has been the mayor of Talkeetna, Alaska for 15 years. '
    cat11 = 'Cats sleep for 70% of their lives.'
    cat12 = 'The longest domestic cat ever measured was 48.5 inches when fully streched out.'
    cat13 = 'The oldest video of cats on youtube dates from 1894.'

    if (n == 1) {
        currentResponse = cat1
    }
    if (n == 2) {
        currentResponse = cat2
    }
    if (n == 3) {
        currentResponse = cat3
    }
    if (n == 4) {
        currentResponse = cat4
    }
    if (n == 5) {
        currentResponse = cat5
    }
    if (n == 6) {
        currentResponse = cat6
    }
    if (n == 7) {
        currentResponse = cat7
    }
    if (n == 8) {
        currentResponse = cat8
    }
    if (n == 9) {
        currentResponse = cat9
    }
    if (n == 10) {
        currentResponse = cat10
    }
    if (n == 11) {
        currentResponse = cat11
    }
    if (n == 12) {
        currentResponse = cat12
    }
    if (n == 13) {
        currentResponse = cat13
    }

    options = {
        hostname: 'api.groupme.com',
        path: '/v3/bots/post',
        method: 'POST'
    };

    body = {
        "bot_id": botID,
        "text": currentResponse
    };

    console.log('sending ' + currentResponse + ' to ' + botID);

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