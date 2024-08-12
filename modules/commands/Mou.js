const fs = require("fs");

module.exports.config = {

  name: "موسى",

    version: "1.0.1",

  hasPermssion: 0,

  credits: "موسى", 

  description: "أحمي سيدي",

  commandCategory: "no prefix",

  usages: "تسلية",

    cooldowns: 5, 

};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {

  var { threadID, messageID } = event;

  if (event.body.indexOf("موسى")==0 || event.body.indexOf("موسي")==0 || event.body.indexOf("moussa")==0 || event.body.indexOf("Test")==0) {

    var msg = {

        body: "أترك سيدي يرتاح 🔪😾",

        attachment: fs.createReadStream(__dirname + `/Mou/welcome.jpeg`)

      }

      api.sendMessage( msg, threadID, messageID);

    api.setMessageReaction("😾", event.messageID, (err) => {}, true)

    }

  }

  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }