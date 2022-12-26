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

// Remove secured playoff spots from api's name key. 
function sanitize(name)
{
  let index = name.indexOf(" x");

  if (index !== -1) {
    name = name.substring(0, index);
  }
  
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

    data.forEach((element, i) => {
      updateCell(authClient, sheetId, `Teams!A${1 + i}:B${1 + i}`, sanitize(element.name));
      updateCell(authClient, sheetId, `Teams!C${1 + i}:D${1 + i}`, element.wins);
    });
  }
}