const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'TIMNASA-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUV2Y1RUMTFETFY3b3Y0K0xBWVNlRXFHVmRFczU1akZYbmlOc0NiZXNIbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTkFsSnc1bFBla1EzVVp3STlteGdrNng5ZVVOV0J1ZWdKc1lzcEFPc1dWTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDRlliNUlmOG9nbFJFdnZMZmN2bm1wb0xwa3FyT1FtdkZSMnlOZkFzaFU4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrOGErbjZob3BSamk5Y3Fua0hYS2R0ZG5NSlJYU1hmVXFLMENDUUNDdmo4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1KMzNyUmtHdEgxZkdYTTYrcWd3MU1OUGVsY3ZGVFJkcElmMVd6ZkEvRmc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkpwKzZFT01ONmVTRlhFUERCbi9MQTNKdDJFZExOWG8yTjd5Uk5ZT1FKVVU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRU85RUlzSGdxTFA3VnhlQ1haV1pqRTJKYTBSOXQ3RnZLTlN4SVJ4OFBHWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidzFjaWtocTN2MmNYM3pmMWxzV2xLV0ZHZit4TXVuZzBwaFcvbk4xOEtqUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1sNWJQbnBQYUhzd01CS3NuV055ZW0vajBwRlNmRFhmUHVpV2R3L3NmRk5odGk4K2t3QnNxYkJBZzhDUExGV3EyUWgwZWVIRDlPYjZFUVh6aFlVdkR3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjExLCJhZHZTZWNyZXRLZXkiOiJLZHRrejhtWnRvOVFNZ202UEcwRTB5bGp5VHg5aGJNcnBwVk5VVGlBQ2NZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI3NzgzNTgzMDY4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjlERTk2MDMyREM4MkUwNEQ2QkI5NDM3NENDQzFENTEzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTU2NjQ3ODN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI3NzgzNTgzMDY4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjY0REQyOTY0NjNGQUMyNjQ3MzNCQzIzRDAzMzE2NDc1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTU2NjQ3ODZ9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI3NzgzNTgzMDY4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijk2RTREMzEzNTI4NEFCREE5RjU5MUQ5MEM5NzQxOTQ3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTU2NjQ4MDd9XSwibmV4dFByZUtleUlkIjozMiwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMyLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IllFNjhTWDVEIiwibWUiOnsiaWQiOiIyNzc4MzU4MzA2ODo0MUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZmB8J2ZjyBCb2ksKkZyYW5rICDwnZmB8J2ZjyDgvIYgIOC8hiDwk4OgIPCSkKvwkpCr8JKQq/CSkKvwkpCr8JKQq/CSkKvwkpCr8JKQq/CSkKvwkpCr8JKQq/CSkKvwkpCr8JKQq/CSkKvwkpCr8JKQq/CSkKvwkpCr8JKQq/CSkKvwkpCr8JKQqyIsImxpZCI6IjU3OTk1NTMwNjQxNTA5OjQxQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSWJSd0tZQkVQcWlsY1VHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMlVKeXJSMy8vWTk5dVlFendGZHIrSTdvRlJwSDZLdE9LcXZjVU42ajNGMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiQUZMUlNFME9OaTBhZHlscG9SYVFLQ3owTkJ2eUVjOC9TQU11SnNjMFBOVjVWRWZYU253dTE3V0xxbVdiRHNGRXFzOEoxUzRmYjhGSjRJZmFPb1JGRFE9PSIsImRldmljZVNpZ25hdHVyZSI6IktBbXNsaGp6L0U2a3BlVlpnNWdYMnR5Ty9DK1hkczVUbVlXQW1vN3BXL29QWC9YZ0xRdW9YVzh6UndBdERWZzdDZ1ZPckx5amRiUzhJb0ZBaTNmekFnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjc3ODM1ODMwNjg6NDFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZGxDY3EwZC8vMlBmYm1CTThCWGEvaU82QlVhUitpclRpcXIzRkRlbzl4ZCJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzU1NjY0Nzc2LCJsYXN0UHJvcEhhc2giOiIyVjc3cVUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUZWaSJ9',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://files.catbox.moe/uugrhr.jpeg,
    OWNER_NAME : process.env.OWNER_NAME || "*@⁨𝙁𝙏 Boi,*Frank  𝙁𝙏 ༆  ༆ 𓃠",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "27783583068", 
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "no",
   AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    AUTO_REACT: process.env.AUTO_REACTION || "no",  
    URL: process.env.URL || "https://files.catbox.moe/uugrhr.jpeg",  
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'non',              
    CHAT_BOT: process.env.CHAT_BOT || "no",
    AUDIO_REPLY: process.env.AUDIO_REPLY || "yes",
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    ANTI_BUG : process.env.ANTI_BUG || "yes",
    ANTI_MENTION_GROUP : process.env.ANTI_MENTION_GROUP || "on",
    ANTI_TAG : process.env.ANTI_TAG || "on",
    ANTI_BAD : process.env.ANTI_BAD || "on",
    ANTI_SHARE_GROUP : process.env.ANTI_SHARE_GROUP || "on",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'viewed by timnasa tmd',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    AUTO_BIO: process.env.AUTO_BIO || 'bo',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_MESSAGE || 'yes',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029Vb6U9BLHbFUxb4Nc2I0U",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029Vb6U9BLHbFUxb4Nc2I0U",
    CAPTION : process.env.CAPTION || "*@⁨𝙁𝙏 Boi,*Frank  𝙁𝙏 ༆  ༆ 𓃠",
    BOT : process.env.BOT_NAME || '*@⁨𝙁𝙏 Boi,*Frank  𝙁𝙏 ༆  ༆ 𓃠',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Capetown", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes',              
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
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
