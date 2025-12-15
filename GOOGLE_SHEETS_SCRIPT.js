// Google Apps Script for IsoMap Lead Capture
// Copy this into Google Apps Script Editor

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);

    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Append the new row
    sheet.appendRow([
      data.email,
      data.timestamp || new Date().toISOString(),
      data.source || 'landing_page'
    ]);

    // Return success
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error
    return ContentService
      .createTextOutput(JSON.stringify({
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional)
function testDoPost() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        email: 'test@example.com',
        timestamp: new Date().toISOString(),
        source: 'test'
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
}
