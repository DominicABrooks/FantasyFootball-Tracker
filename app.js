const football = require("./footballData.js");
const sheet = require("./sheet.js");

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

// run main
main();

