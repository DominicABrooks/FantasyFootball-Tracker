const football = require("./footballData.js");
const sheet = require("./sheet.js");
const cron = require('node-cron');

async function main() 
{
    // get data from api
    football.getData() 
    // when promise resolved, pass it to update sheet   
    .then(function (response) {
        sheet.updateSheet(response.data._embedded.teamWinStatsList);
    // otherwise, if it fails, log the error
    }).catch(function (error) {
        console.error(error);
    });
};

// get start args
const args = process.argv.slice(2);

// if first arg is 'now', then call main before starting crono-schedule
if(args[0] == 'now')
{
    main();
}

// if first arg is 'once', then call main and exit program. Only update once
if(args[0] == 'once')
{
    main();
    process.exit();
}

// run main every-day at 12am
cron.schedule('0 0 * * *', () => {
    main();
});