module.exports.config = {
    name: "fact2",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    description: "",
    commandCategory: "image",
    usages: "text",
    cooldowns: 0,
    dependencies: {
        "fs-extra": "",
        "request": ""
    }
};
module.exports.run = async ({ api, event,args }) => {  {
    
    const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
	 const { threadID, messageID, senderID, body } = event;
	let text = args.toString().replace(/,/g,  '  ');
if (!text)
    return api.sendMessage("Add text lmao", event.threadID, event.messageID);

	 var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/cache/biden.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/biden.png"),event.messageID);
	 return request(encodeURI(`https://api.popcat.xyz/facts?text=${text}`)).pipe(fs.createWriteStream(__dirname+'/cache/biden.png')).on('close',() => callback());     
}}
