const {google} = require('googleapis');
const sheets = google.sheets('v4');

// Update selected cell with value
async function updateCell(authClient, sheetId, cell, value) {
  const updateRequest = {
    auth: authClient,
    spreadsheetId: sheetId,
    range: cell,
    valueInputOption: 'RAW',
    resource: {
      values: [[value]]
    }
  };

  const response = await sheets.spreadsheets.values.update(updateRequest);
}

// Update a teams row in the teams sheet with updated values
async function updateTeamDataRow(authClient, sheetId, team_cell, name, win_cell, wins) {
  const updateRequest = {
    auth: authClient,
    spreadsheetId: sheetId,
    resource: {
      valueInputOption: 'RAW',
      data:
      [      
        {
          range: team_cell, // team name cell
          values: [[name]]
        }, 
        {
          range: win_cell, // wins that team has
          values: [[wins]]
        }
      ]
    }
  };

  // batch update team and wins
  const response = await sheets.spreadsheets.values.batchUpdate(updateRequest);
  // log response
  console.log(response);
}

// Remove secured playoff spots from api's name key. 
function sanitize(name)
{
  // find index of playoff spot
  let index = name.indexOf(" x");

  // if exist, remove it
  if (index !== -1) {
    name = name.substring(0, index);
  }
  
  // return shortened name
  return name;
}

module.exports = 
{
  updateSheet: async function (data) {
    // Set the credentials
    const auth = new google.auth.GoogleAuth({
      keyFile: 'keyfile.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    const authClient = await auth.getClient();

    // Set the sheet ID and range
    const sheetId = '1yENks4miU3Ya4RpLX38x2E4BTW6bWGis6s7zbLy-nZ0';

    // Loop through the team sheet and fill in all data
    data.forEach((element, i) => {
      updateTeamDataRow(authClient, sheetId,`Teams!A${2 + i}:B${2 + i}`, sanitize(element.name), `Teams!C${2 + i}:D${2 + i}`, element.wins);
      //updateCell(authClient, sheetId, `Teams!A${2 + i}:B${2 + i}`, sanitize(element.name));
      //updateCell(authClient, sheetId, `Teams!C${2 + i}:D${2 + i}`, element.wins);
    });

    let now = new Date(Date.now());
    updateCell(authClient, sheetId, `Standings!G2:H2`, now.toLocaleString());
  }
}