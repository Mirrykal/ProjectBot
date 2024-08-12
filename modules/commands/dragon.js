const fs = require("fs");

module.exports.config = {

  name: "شارة دراغون بول",

    version: "1.0.1",

  hasPermssion: 0,

  credits: "موسى", 

  description: "شارة بداية دراغون بول",

  commandCategory: "anime op",

  usages: "تسلية",

    cooldowns: 5, 

};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {

  var { threadID, messageID } = event;

  if (event.body.indexOf ("زانساس")==0 || event.body.indexOf("🐉")==0 || event.body.indexOf("dragon ball")==0 || event.body.indexOf("أغنية دراغون بول")==0) {

    var msg = {

        body: "⏯️",

        attachment: fs.createReadStream(__dirname + `/Mou/dragon_sp.mp3`)

      }

      api.sendMessage( msg, threadID, messageID);

    api.setMessageReaction("❤️", event.messageID, (err) => {}, true)

    }

  }

  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }