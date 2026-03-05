const ADMIN_EMAIL = "tn31holidays@gmail.com";

/**
 * Handle form submissions
 */
function doPost(e) {
  try {
    Logger.log("Received a request");

    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("Empty request body");
    }

    const data = JSON.parse(e.postData.contents);
    Logger.log("Parsed data: " + JSON.stringify(data));

    // 1. Save to Google Sheet
    appendToSheet(data);

    // 2. Send Notifications (Wrapped in individual try-catch to ensure one failure doesn't stop everything)
    try {
      sendAdminNotification(data);
    } catch (err) {
      Logger.log("Admin Email Error: " + err.toString());
    }

    try {
      sendUserConfirmation(data);
    } catch (err) {
      Logger.log("User Email Error: " + err.toString());
    }

    return ContentService.createTextOutput(
      JSON.stringify({
        result: "success",
        message: "Data saved and emails triggered",
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log("doPost Error: " + error.toString());
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: error.toString() }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Saves the form data to the spreadsheet
 */
function appendToSheet(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Sheet1") || ss.getSheets()[0];

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
      "Package",
      "Tour Method",
      "Message",
    ]);
    sheet.getRange(1, 1, 1, 12).setFontWeight("bold").setBackground("#f0f0f0");
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

  Logger.log("Data appended to sheet successfully");
}

/**
 * Sends a detailed email to the Admin
 */
function sendAdminNotification(data) {
  const subject = `New Enquiry from ${data.name || "Unknown"}`;

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .container { max-width: 600px; padding: 20px; border: 1px solid #eee; }
        .header { background: #FF8D1D; color: white; padding: 10px; text-align: center; }
        .field { margin: 10px 0; border-bottom: 1px solid #f9f9f9; padding-bottom: 5px; }
        .label { font-weight: bold; color: #555; width: 150px; display: inline-block; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h2>New Tour Enquiry arrived</h2></div>
        <div class="field"><span class="label">Name:</span> ${data.name}</div>
        <div class="field"><span class="label">Email:</span> ${data.email}</div>
        <div class="field"><span class="label">Mobile:</span> ${data.mobile}</div>
        <div class="field"><span class="label">From:</span> ${data.startLocation}</div>
        <div class="field"><span class="label">To:</span> ${data.endDestination}</div>
        <div class="field"><span class="label">Dates:</span> ${data.startDate} to ${data.endDate}</div>
        <div class="field"><span class="label">Persons:</span> ${data.numberOfPeople}</div>
        <div class="field"><span class="label">Package:</span> ${data.packageSelection}</div>
        <div class="field"><span class="label">Method:</span> ${data.tourMethod}</div>
        <div class="field"><span class="label">Message:</span><br>${data.message}</div>
      </div>
    </body>
    </html>
  `;

  GmailApp.sendEmail(
    ADMIN_EMAIL,
    subject,
    "New enquiry received. Please view in HTML.",
    {
      htmlBody: htmlBody,
    },
  );
  Logger.log("Admin notification sent");
}

/**
 * Sends a professional confirmation email to the User
 */
function sendUserConfirmation(data) {
  if (!data.email) {
    Logger.log("Skip user email: No address provided");
    return;
  }

  const subject = "Enquiry Received - TN31 Holidays";

  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #444; }
        .card { max-width: 500px; margin: 20px auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; }
        .banner { background: #2c3e50; color: #ffffff; padding: 20px; text-align: center; }
        .content { padding: 30px; }
        .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; }
        .btn { background: #FF8D1D; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="banner">
          <h1 style="margin:0;">TN31 HOLIDAYS</h1>
        </div>
        <div class="content">
          <p>Dear <strong>${data.name}</strong>,</p>
          <p>Thank you for reaching out to us! We have received your enquiry for the <strong>${data.packageSelection}</strong>.</p>
          <p>Our travel experts are already reviewing your requirements and will get back to you within 24 hours with a customized itinerary and the best pricing.</p>
          <p><strong>Enquiry Summary:</strong></p>
          <ul>
            <li>Destination: ${data.endDestination}</li>
            <li>Travel Dates: ${data.startDate}</li>
            <li>Guests: ${data.numberOfPeople}</li>
          </ul>
          <p>Need urgent assistance? Call us at <a href="tel:+919361436662">+91 9361436662</a></p>
        </div>
        <div class="footer">
          &copy; 2025 TN31 Holidays | Explore with Comfort & Trust
        </div>
      </div>
    </body>
    </html>
  `;

  GmailApp.sendEmail(
    data.email,
    subject,
    "Thank you for your enquiry. We will contact you soon.",
    {
      htmlBody: htmlBody,
    },
  );
  Logger.log("User confirmation sent to " + data.email);
}

/**
 * ✅ IMPORTANT: RUN THIS ONCE MANUALLY in the Apps Script Editor
 * to authorize Gmail and Google Sheets access.
 */
function authorizeScript() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const email = Session.getActiveUser().getEmail();
  Logger.log("Authorization Successful for: " + email);
  Browser.msgBox("Script Authorized Successfully!");
}
