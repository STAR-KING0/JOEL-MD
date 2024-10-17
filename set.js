const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY1BFamkvVjNjRDZXT1Zadm0rM0Z4eCt3ZzVrenBjYjFUZWtTcHlyaS9Wdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0FzMUNqbi9ybzdKb1ExRjM4WVJpSitzdXkxMDJ2dkZaQVN6dkZTdGJoYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHRGN1OGRiTnRXK2F1YlVYOEd4VnVabjBLS2t5RGZoREhXbDFvVkszem1VPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJteUtFQnczbDdZVC9Jcm5aQWkzRFV0L25YbWM0a3h1T1M5cEwwQythbXp3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9MQ2ZHYnZGWWhRTHg1QVpnWDliWFdJcml3ZmNRNjEvNmFZUW9SOVY1VWM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJmN1hSL3d6QmdWUnYyWEpMSERBaG5JRytSVkRpZFpsTEZ0ZjJqRDB5V1U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUVUNmg1RmJoWVJ6TDNSV2wrblovQkR1UkJsSjVBVWpBRkhNYThSVTJtaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidzduOFAvd09sVTRRdzdqUWg1Rm0rRzZNNUNUbThWUDF0SVpoWWdzcTVGdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imt0cXpoZXhDWVcrY3ZJTjR1R1lBem5jYk5JRVowbnk5VG1CMDlWSDV3dEpkK2k0TUpaZHJxc3BTanh4UjNEUUdoZU0vdENldzdDSU1yRjRYdkgzMGl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTA1LCJhZHZTZWNyZXRLZXkiOiIxaEtyUWEwdDJKZlE5cHAyQU1lanFwcFNWZzJOTzMvMzc0SjFJQ3Rsa3BjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgxNTA5MjQ4ODdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiODdDNDJBQjc0NEQ3NDRGRDlCNThFMzI4OTFDQTZBNTAifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyOTIwNDYyNX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODE1MDkyNDg4N0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIwMzZEN0ZCNjg0Qjg0NzgxNDY1OTI2MTYxMzU0RjMwNyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI5MjA0NjI2fV0sIm5leHRQcmVLZXlJZCI6NjEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo2MSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJzX1BJYkdjMVNFcUpEcDZCRHFKN0tnIiwicGhvbmVJZCI6ImFmNjU3MmY1LTA3ZWEtNGVlMS1iNTRjLTRkYmMyZDg5MDhkYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBNkJEWlFIN1N3M3MyR0s2cWJXYlBjYmNCZTA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTlZ0VGp6c2NDbllYZXVxM2taYjM2NEV1Q0dvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkQ0QTU2TVFSIiwibWUiOnsiaWQiOiIyMzQ4MTUwOTI0ODg3OjhAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiS2luZyBEYXZpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTlhlOWQ0R0VJR2p4cmdHR0FVZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoicmpyMlNRK1RlTDI2c0FOQnhWaHczMzdzTXRWREtWczBtb1B2K2tGOVl5bz0iLCJhY2NvdW50U2lnbmF0dXJlIjoidVlHU1U5QWthazhTOFZuOXBwNmdSaDd1emovZEo3YTBoRUg3TGt3TWdZekU1SWxiY09FUnJwakQ3UHZ0K2V1TXNQLzNvRFMrM3hOUUJVWm8wR3ZmQXc9PSIsImRldmljZVNpZ25hdHVyZSI6IkFaeE5nc2JLNG1SK0ZOSlA0OVdHb1NSVEtaaDF4aUVKRXY3TEtwVXJLbXZMczJRMEVoU1RSTjhXcm5mV3JMNm9TTkx6QmNJcVVUYXluZlZyUHBpZWpnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODE1MDkyNDg4Nzo4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmE0Njlra1BrM2k5dXJBRFFjVlljTjkrN0RMVlF5bGJOSnFENy9wQmZXTXEifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjkyMDQ2MjMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRklwIn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "joel Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "2349123721026",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'TEST MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/1774326c63cc0b0e87680.jpg,https://telegra.ph/file/2e5cb1ec0619781c9fa41.jpg,https://telegra.ph/file/91e4fd1e8ce0fe6bb2253.jpg,https://telegra.ph/file/19df783b5751341a78780.jpg,https://telegra.ph/file/56dfb94e0f8b32fab33a7.jpg,https://telegra.ph/file/fe8a25fb17af3926e6048.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
