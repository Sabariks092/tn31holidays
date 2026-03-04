function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Sheet1") || ss.getSheets()[0];

    const data = JSON.parse(e.postData.contents);

    // If sheet is empty, add headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Email",
        "Mobile",
        "Start Location",
        "End Destination",
        "Start Date",
        "End Date",
        "Number of People",
        "Package Selection",
        "Tour Method",
        "Message",
      ]);
      sheet
        .getRange(1, 1, 1, 12)
        .setFontWeight("bold")
        .setBackground("#f0f0f0");
    }

    sheet.appendRow([
      new Date(),
      data.name || "N/A",
      data.email || "N/A",
      data.mobile || "N/A",
      data.startLocation || "N/A",
      data.endDestination || "N/A",
      data.startDate || "N/A",
      data.endDate || "N/A",
      data.numberOfPeople || "N/A",
      data.packageSelection || "N/A",
      data.tourMethod || "N/A",
      data.message || "N/A",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success" }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: error.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
