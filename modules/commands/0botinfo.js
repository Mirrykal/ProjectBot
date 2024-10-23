module.exports.config = {
	name: "botinfo",
	version: "1.0.1", 
	hasPermssion: 0,
	credits: "YIN YAN", 
	description: "Bot info.",
	commandCategory: "system",
	cooldowns: 1,
	dependencies: {
		"request": "",
		"fs-extra": "",
		"axios": ""
	}
};

module.exports.run = async function({ api, event, args, client, Users, Threads, __GLOBAL, Currencies }) {
	const axios = global.nodemodule["axios"];
	const request = global.nodemodule["request"];
	const fs = global.nodemodule["fs-extra"];
	const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
	const moment = require("moment-timezone");
	var currentTime = moment.tz("Asia/Kolkata").format("『D/MM/YYYY』 【HH:mm:ss】");
	var imageLinks = [
		"https://i.postimg.cc/BQKMPTH2/dff18df232591f91f13e37762327beea.jpg"
	];
	var sendBotInfo = () => api.sendMessage({
		body: `===☯️ 𝙔𝙄𝙉 𝙔𝘼𝙉'𝙎 𝘽𝙊𝙏 ☯️===\n\n🌿 𝘽𝙊𝙏𝙉𝘼𝙈𝙀 🌿 »» ${global.config.BOTNAME}\n🌀 𝙋𝙍𝙀𝙁𝙄𝙓 🌀  »» ${global.config.PREFIX} ««\n\n🕉️ 𝙐𝙋𝙏𝙄𝙈𝙀 🕉️\n\n📅 𝑫𝑨𝑻𝑬 𝑨𝑵𝑫 𝑻𝑰𝑴𝑬 📅\n${currentTime}\n\n✨ 𝘽𝙊𝙏 𝙄𝙎 𝙍𝙐𝙉𝙉𝙄𝙉𝙂 ✨\n🕛 ${hours}:${minutes}:${seconds} 🕧`,
		attachment: fs.createReadStream(__dirname + "/cache/juswa1.jpg")
	}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa1.jpg"));
	
	return request(encodeURI(imageLinks[Math.floor(Math.random() * imageLinks.length)])).pipe(fs.createWriteStream(__dirname + "/cache/juswa1.jpg")).on("close", () => sendBotInfo());
};
