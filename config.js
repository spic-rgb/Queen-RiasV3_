const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2348165846414",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkZ1Y21jaWpLSVVaSGVSUzZKT0xoN3Z4KzN4bmlHenVrRzZSY0czajRuVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNHhjZDdzai9oeGZ5WE1oWkdzTzB5RkZVK21DWVlSRk04UER1UXFTRFJnOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzTVFjRFVnUWpDSlRaUmQraFd3MnIwaGRRRWFyZnNJdmhBWWN2UC83V2tRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJdGZjN2dTYUtWN2JScDVaRTIzZUhkNjlrdGRheUJvQ1NOY0FsMDhqOGdzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdJaG1TeDN6azdWQXIydWNvTU4yWk9hN0oxbVRmakllaFdFcEJiV0lmMUk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpIUHN0SDlKUlJtSXVQT09veUxCU0FZdUdQSDd4dHN1cGhZZlhWVzUraUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUxyaThHaUNQb3NBZFVuN20xOWRLVjNXSnhHN2xMOUsvVnNnYjlidExWaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYWwwclNzMFhoSERTMmRhT1ZVVFJFTVpOa3lCZVE1aU1aUzdvU2NScFh3ST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJIUWdFOGtCQWV4dWgxMm1jS0RxY3hWQ2RxREFqSk1XTzljcSt5MDRpWGNVSTYra0dWZmJPYk5jVmVLczVVTnNQRk5xbUpOTzJLWlVYeC9GTWIrOWhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDgsImFkdlNlY3JldEtleSI6IjYwenhzVFhHU3pvSWlhTDU0d1pISko0dkI3SjhRbTk3V1FveUNnTjJYblE9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjRRNkhMUVNFIiwibWUiOnsiaWQiOiIyNjM3MTk0OTUwNjc6MjFAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiI4MDI1NjMxMjU4NjI4NDoyMUBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0k3MjB2b0hFT204ajc4R0dCUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InhjWlkrQ1Axb3NzWXF1QWZnTDQ3UnpGNFhycGh1Sm1RNWltOWdtbE4rSEU9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im9QUno1UHNzL0NXRzFyUmFLQW5ubS9Nakcydm1WRC9NVTBPbnhIYkM5SnU3MlJOR2FkbGRKYk9NNmVDdXhyenJ6QXVtUkpkVEdYSHFqbDFwOEFzdUJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJPdm4va1NNSms0UzBPRlRxVEVpUGc4eVduOXd1ZXVpWU5pdVhhcVNUYi9EWmxVT0ovdy9VQW4rT0U2VXBqY0Y3cnpvY0prSG44MitnbXNvMDJxRlVpZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxOTQ5NTA2NzoyMUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjWEdXUGdqOWFMTEdLcmdINEMrTzBjeGVGNjZZYmlaa09ZcHZZSnBUZmh4In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJQWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDI5ODY4NzEsImxhc3RQcm9wSGFzaCI6IjJQMVloZiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBS3liIn0=",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
