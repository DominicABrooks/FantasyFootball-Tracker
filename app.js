const football = require("./footballData.js");
const sheet = require("./sheet.js");

async function main() 
{
    football.getData()    
    .then(function (response) {
        sheet.updateSheet(response.data._embedded.teamWinStatsList);
    }).catch(function (error) {
        console.error(error);
    });
};


main();

