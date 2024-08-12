module.exports.config = {
  name: "كنية",
  version: "1.0.1",
  hasPermssion: 1,
  credits: "BLACK",
  description: "Automatic setname for new members",
  commandCategory: "Box Chat",
  usages: "[add /remove]",
  cooldowns: 5
}

module.exports.onLoad = () => {
  const { existsSync, writeFileSync } = require('fs-extra');
  const { join } = require('path');
  const pathData = join(__dirname,"autosetname.json");
  if (!existsSync(pathData)) return writeFileSync(pathData, "[]", "utf-8");
}

module.exports.run = async function ({ event, api, args, permission, Users }) {
  const { threadID, messageID } = event;
  const { readFileSync, writeFileSync } = require('fs-extra');
  const { join } = require('path');

  const pathData = join(__dirname,"autosetname.json");
  const dataJson = JSON.parse(readFileSync(pathData, "utf-8"));
  let thisThread = dataJson.find(item => item.threadID == threadID) || { threadID, nameUser: [] };

  switch (args[0]) {
    case "add": {
      if (thisThread.nameUser.length > 0) return api.sendMessage("Please remove the old name configuration before setting a new name!", threadID, messageID);
      thisThread.nameUser.push('『جندي⊰🐉⊱');
      const name = (await Users.getData(event.senderID)).name;
      api.sendMessage(`Configured a successful new member name\nPreview: 『جندي⊰🐉⊱${name}』`, threadID, messageID);
      break;
    }
    case "rm":
    case "remove":
    case "delete": {
      if (thisThread.nameUser.length == 0) return api.sendMessage("Your group hasn't configured a new member's name!", threadID, messageID);
      thisThread.nameUser = [];
      api.sendMessage("Successfully deleted the configuration of a new member's name", threadID, messageID);
      break;
    }
    default: {
      return api.sendMessage(`Usage:\nautosetname add to configure a nickname for a new member\nautosetname remove to remove the nickname configuration for the new member`, threadID, messageID);
    }
  }

  if (!dataJson.some(item => item.threadID == threadID)) dataJson.push(thisThread);
  writeFileSync(pathData, JSON.stringify(dataJson, null, 4), "utf-8");
}