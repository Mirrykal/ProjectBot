var hiro = "CHAND";
const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "logo",
  version: "1.0",
  hasPermssion: 0,
  credits: `${hiro}`,
  description: "Generate logos",
  commandCategory: "logo",
  usages: "logo",
  cooldowns: 2,
};

module.exports.run = async function ({ api, event, args, Users }) {
  let { messageID, senderID, threadID } = event;

  if (args.length === 1 && args[0] === "list") {
    const logoTypes = [
      "\n1 : Glowing", "\n2 : chromelogo", "\n3 : black metal", "\n4 : bluetext","\n5 : bluemetal","\n6 : hot logo",
      "\n7 : carbon", "\n8 : yellow", "\n9 : golden", "\n10 : blue jewerly", "\n11 : cyan jewerly", "\n12 : green",
      "\n13 : orange jewerly", "\n14 : purple jewerly", "\n15 : red jewerly", "\n\nmore logo for : logov2"
    ];
    return api.sendMessage(`All types of logos:\n\n${logoTypes.join(", ")}`, threadID, messageID);
  }

  if (args.length < 2) {
    return api.sendMessage(`Use: logo number <name>\n to see all logo types: logo list`, threadID, messageID);
  }

  let type = args[0].toLowerCase();
  let name = args[1];
  let name2 = args.slice(2).join(" ");
  let pathImg = __dirname + `/cache/${type}_${name}.png`;
  let apiUrl, message;

  switch (type) {
    case "1":
      apiUrl =`https://reset-api.ch9nd.repl.co/api/textpro/1?text=${name}`;
      message = "[Glowing] Logo created:";
      break;
    case "2":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/2?text=${name}`;
      message = "[chrome LOGO] Logo created:";
      break;
    case "3":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/3?text=${name}`;
      message = "[black metal] Logo created:";
      break;
    case "4":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/4?text=${name}`;
      message = "[bluetext] Logo created:";
      break;
    case "5":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/5?text=${name}`;
      message = "[bluemetal] Logo created:";
      break;
    case "6":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/6?text=${name}`;
      message = "[hot logo] Logo created:";
      break;
    case "7":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/7?text=${name}`;
      message = "[carbon] Logo created:";
      break;
    case "8":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/8?text=${name}`;
      message = "[yellow] Logo created:";
      break;
    case "9":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/9?text=${name}`;
      message = "[golden] Logo created:";
      break;
    case "10":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/10?text=${name}`;
      message = "[blue jewerly] Logo created:";
      break;
    case "11":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/11?text=${name}`;
      message = "[cyan jewerly] Logo created:";
      break;
    case "12":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/12?text=${name}`;
      message = "[green logo] Logo created:";
      break;
    case "13":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/13?text=${name}`;
      message = "[orange jewerly] Logo created:";
      break;
    case "14":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/14?text=${name}`;
      message = "[purple jewerly] Logo created:";
      break;
    case "15":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/15?text=${name}`;
      message = "[red jewerly] Logo created:";
      break;
    default:
      return api.sendMessage(`Invalid logo type! Use: /log0 list to show all logo types`, threadID, messageID);
  }

  api.sendMessage("Please wait...", threadID, messageID);
  let response = await axios.get(apiUrl, { responseType: "arraybuffer" });
  let logo = response.data;
  fs.writeFileSync(pathImg, Buffer.from(logo, "utf-8"));
  return api.sendMessage(
    {
      body: message,
      attachment: fs.createReadStream(pathImg),
    },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};
