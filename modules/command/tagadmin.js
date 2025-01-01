const fs = require('fs');
const moment = require('moment-timezone');
module.exports.config = {
     name: "tagadmin", // Command name, used in calling the command
     version: "1.0.0", // version of this module
     hasPermssion: 2, // Permission to use, with 0 being all members, 1 being admin or higher, 2 being admin/owner
     credits: "𝐀𝐒𝐈𝐅 𝐱𝟔𝟗",
     description: "Tag admin bot", // Detailed information about the command
     commandCategory: "Admin", // Which group belongs to: system, other, game-sp, game-mp, random-img, edit-img, media, economy, ...
     usages: "[msg]", // Command usage
     cooldowns: 5 // How long a person can repeat the command
};
module.exports.onLoad = () => {
     const fs = require("fs-extra");
     const request = require("request");
     const dirMaterial = __dirname + `/noprefix/`;
     if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
     if (!fs.existsSync(dirMaterial + "tagadmin.jpg")) request("https://i.imgur.com/8rUYUiz.jpg ").pipe(fs.createWriteStream(dirMaterial + "tagadmin.jpg")) ;
                        }

module.exports.handleReply = async function ({ api, event, handleReply, Users, Threads, args }) {
let uid = event.senderID;
var msg = [`ljkj`];
     const { threadID, messageID, body } = event;
     switch (handleReply.type) {
         case "tagadmin": {
             let name = await Users.getNameUser(handleReply.author);
             api.sendMessage({body: `=== 『 FEEDBACK FROM ADMIN 』 ===\n━━━━━━━━━━━━━━━━\n\n[💬] ➜ Content: ${ body}\n[👤] ➜ Admin: ${name || "Facebook User"}\n[🌐] ➜ Facebook: https://www.facebook.com/profile.php?id=${event.senderID }\n[👑] ➜ Sending destination: ${event.isGroup == true ? 'Group ' + global.data.threadInfo.get(event.threadID).threadName: 'from private chat with bot '} \n [⏰] ➜ Time: ${moment().tz("Asia/Dhaka").format("HH:mm:ss - DD/MM/YYYY")}\n[⚜️] ➜ Reply message ( Reply ) about admin `, attachment: await downLoad(`https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, __dirname+'/cache/12345.jpg' )}, handleReply.threadID, (err, info) => {
                 if(err) console.log(err)
                 else {
                     global.client.handleReply.push({
                         name: this.config.name,
                         type: "reply",
                         messageID: info.messageID,
                         messID: messageID,
                         threadID
                     })
                 }
             }, handleReply.messID);
             break; break;
         }
         case "reply": {
             let name = await Users.getNameUser(event.senderID);
             api.sendMessage({body: `=== 『 FEEDBACK FROM USER 』 ===\n━━━━━━━━━━━━━━━━\n\n[💬] ➜ Content: ${ body}\n[👤] ➜ Name: ${name || "Facebook User"}\n[👨‍👩‍👧‍👦] ➜ Box : ${(await Threads.getInfo(threadID)).threadName || "Group name does not exist"}\n[⏰] ➜ Time: ${moment().tz("Asia/Dhaka").format("HH:mm:ss - DD/MM/YYYY")}\n [⚜️] ➜ Reply message (response) to the person tagged`, attachment: await downLoad(`https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662 `, __dirname+'/cache/12345.jpg')},handleReply.threadID, (err, info) => {
                 if(err) console.log(err)
                 else {
                     global.client.handleReply.push({
                         name: this.config.name,
                         type: "tagadmin",
                         messageID: info.messageID,
                         messID: messageID,
                         threadID
                     })
                 }
             }, handleReply.messID);
             break; break;
         }
     }
}

module.exports.handleEvent = async ({ api, event, Users, Threads, args }) => {
     const { threadID, messageID, body, mentions, senderID } = event;
     let path = __dirname + "/cache/tagadmin.json";
     if(!fs.existsSync(path)) fs.writeFileSync(path, "{}");
     let data = JSON.parse(fs.readFileSync(path));
     if(!data[threadID]) data[threadID] = true;
     if(!mentions || !data[threadID]) return;
     let mentionsKey = Object.keys(mentions);
     let allAdmin = global.config.ADMINBOT;
     mentionsKey.forEach(async (each) => {
         if(each == api.getCurrentUserID()) return;
         if(allAdmin.includes(each)) {
             let userName = await Users.getNameUser(senderID);
             let threadName = await Threads.getInfo(threadID).threadName;
             api.sendMessage({body:`=== 『 TAG ADMINBOT 』 ===\n━━━━━━━━━━━━━━━━\n\n[👤] ➜ Tag person: ${userName }\n[👨‍👩‍👧‍👦] ➜ Box: ${(await Threads.getInfo(threadID)).threadName || "Group name does not exist"}\n[💬] ➜ Content: ${body }\n[⏰] ➜ Time: ${moment().tz("Asia/Dhaka").format("HH:mm:ss - DD/MM/YYYY")}\n[⚜️] ➜ Reply message (Response) to the person tagged`, attachment: await downLoad(`https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, __dirname+'/cache/12345.jpg')},each, (err, info) => {
                 if(err) console.log(err)
                 else {
                     global.client.handleReply.push({
                         name: this.config.name,
                         type: "tagadmin",
                         messageID: info.messageID,
                         messID: messageID,
                         author: each,
                         threadID
                     })
                 }
             })
         }
     })
     fs.writeFileSync(path, JSON.stringify(data, null, 4));
}

module.exports.run = async ({ api, event, args }) => {
const fs = require("fs");
     const { threadID } = event;
     let path = __dirname + "/cache/tagadmin.json";
     if(!fs.existsSync(path)) fs.writeFileSync(path, "{}");
     let data = JSON.parse(fs.readFileSync(path));
     if(!data[threadID]) data[threadID] = true;
     if(args[0] == "off") data[threadID] = false;
     else if(args[0] == "on") data[threadID] = true;
     else return api.sendMessage({body: `[⚜️] ➜ Please turn tagadmin On or Off`, attachment: (await axios.get((await axios.get(`https://docs-api.jrtxtracy.repl. co/nsfw/ausand?apikey=JRTvip_2200708248`)).data.data, {
                     responseType: 'stream'
                 })).data
}, event.threadID);
     fs.writeFileSync(path, JSON.stringify(data, null, 4));
     return api.sendMessage({body: `[⚜️] ➜ Tag Admin has been ${data[threadID] ? "On" : "Off"}`, attachment: (await axios.get((await axios.get(`https ://docs-api.jrtxtracy.repl.co/nsfw/ausand?apikey=JRTvip_2200708248`)).data.data, {
                     responseType: 'stream'
                 })).data
}, event.threadID);
};

async function downLoad(a, b) {
     await (require('image-downloader')).image({
         url: a, dest: b
     });
     return (require('fs-extra')).createReadStream(b);
};