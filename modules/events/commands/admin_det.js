const fs = require("fs");
module.exports.config = {
  name: "admin2",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "𝙋𝙧𝙞𝙮𝙖𝙣𝙨𝙝 𝙍𝙖𝙟𝙥𝙪𝙩", 
  description: "hihihihi",
  commandCategory: "no prefix",
  usages: "admin",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("saloni")==0 || event.body.indexOf("Saloni")==0 || event.body.indexOf("SALONI")==0 || event.body.indexOf("sloni")==0) {
    var msg = {
        body: "🫅 Group Admin 🫅",
        attachment: 
fs.createReadStream(__dirname + `/noprefix/profile.png`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🫅", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }