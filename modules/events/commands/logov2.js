var hiro = "CHAND";
const axios = require("axios");
const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "logov2",
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
      "\n1 : silver jewerly", "\n2 : yellow jewerly", "\n3 : shiny metal", "\n4 : purple gem","\n5 : rainbow metal","\n6 : SCI FI logo",
      "\n7 : wood text", "\n8 : bagal text", "\n9 : biscuit text", "\n10 : abstra gold", "\n11 : rusty metal", "\n12 : fruit juice",
      "\n13 : ice cream", "\n14 : marble metal", "\n15 : slabs marble", "\n\nmore logo for : logov3 coming soon for wait logov3"
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
      apiUrl =`https://reset-api.ch9nd.repl.co/api/textpro/16?text=${name}`;
      message = "[silver jewerly] Logo created:";
      break;
    case "2":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/17?text=${name}`;
      message = "[yellow jewerly] Logo created:";
      break;
    case "3":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/18?text=${name}`;
      message = "[shiny metal] Logo created:";
      break;
    case "4":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/19?text=${name}`;
      message = "[purple gem] Logo created:";
      break;
    case "5":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/20?text=${name}`;
      message = "[rainbow metal] Logo created:";
      break;
    case "6":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/21?text=${name}`;
      message = "[SCI FI logo] Logo created:";
      break;
    case "7":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/22?text=${name}`;
      message = "[wood text] Logo created:";
      break;
    case "8":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/23?text=${name}`;
      message = "[bagal text] Logo created:";
      break;
    case "9":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/24?text=${name}`;
      message = "[biscuit text] Logo created:";
      break;
    case "10":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/25?text=${name}`;
      message = "[abstra gold] Logo created:";
      break;
    case "11":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/26?text=${name}`;
      message = "[rusty metal] Logo created:";
      break;
    case "12":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/27?text=${name}`;
      message = "[fruit juice] Logo created:";
      break;
    case "13":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/28?text=${name}`;
      message = "[ice cream] Logo created:";
      break;
    case "14":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/29?text=${name}`;
      message = "[marble metal] Logo created:";
      break;
    case "15":
      apiUrl = `https://reset-api.ch9nd.repl.co/api/textpro/30?text=${name}`;
      message = "[slabs marble] Logo created:";
      break;
    default:
      return api.sendMessage(`Invalid logo type! Use: /logo list to show all logo types`, threadID, messageID);
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
