module.exports.config = {
  name: "pair",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "ALI BABA",
  description: "pairing",
  commandCategory: "Love", 
  usages: "pair", 
  cooldowns: 10
};
module.exports.run = async function({ api, event,Threads, Users }) {
        const axios = global.nodemodule["axios"];
        const fs = global.nodemodule["fs-extra"];

        var { participantIDs } =(await Threads.getData(event.threadID)).threadInfo;
        var tle = Math.floor(Math.random() * 101);
        var namee = (await Users.getData(event.senderID)).name
        const botID = api.getCurrentUserID();
        const listUserID = event.participantIDs.filter(ID => ID != botID && ID != event.senderID);
        var id = listUserID[Math.floor(Math.random() * listUserID.length)];
        var name = (await Users.getData(id)).name
        var arraytag = [];
        const gifCute = ["https://i.pinimg.com/originals/42/9a/89/429a890a39e70d522d52c7e52bce8535.gif","https://i.imgur.com/HvPID5q.gif","https://i.pinimg.com/originals/9c/94/78/9c9478bb26b2160733ce0c10a0e10d10.gif","https://i.pinimg.com/originals/9d/0d/38/9d0d38c79b9fcf05f3ed71697039d27a.gif","https://i.imgur.com/BWji8Em.gif","https://i.imgur.com/ubJ31Mz.gif"];
                arraytag.push({id: event.senderID, tag: namee});
                arraytag.push({id: id, tag: name});


        let Avatar = (await axios.get( `https://graph.facebook.com/${event.senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/avt.png", Buffer.from(Avatar, "utf-8") );

        let gifLove = (await axios.get(gifCute[Math.floor(Math.random() * gifCute.length)], { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/giflove.png", Buffer.from(gifLove, "utf-8") );

        let Avatar2 = (await axios.get( `https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" } )).data;
            fs.writeFileSync( __dirname + "/cache/avt2.png", Buffer.from(Avatar2, "utf-8") );

        var imglove = [];

              imglove.push(fs.createReadStream(__dirname + "/cache/avt.png"));
              imglove.push(fs.createReadStream(__dirname + "/cache/giflove.png"));
              imglove.push(fs.createReadStream(__dirname + "/cache/avt2.png"));

        var msg = {body: `🅢𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋 🅟𝐀𝐈𝐑𝐈𝐍𝐆
𝐇𝐎𝐏𝐄 𝐘𝐎𝐔 𝐁𝐎𝐓𝐇 𝐖𝐈𝐋𝐋 𝐒𝐓𝐎𝐏 𝐅𝐋𝐈𝐑𝐓𝐈𝐍𝐆 ⊂◉‿◉\n━━━━━━━━━━━━━━━━━━ ${namee} 💓 ${name}\n━━━━━━━━━━━━━━━━━━\n➥ 𝐃𝐎𝐔𝐁𝐋𝐄 𝐑𝐀𝐓𝐈𝐎: ${tle}%\n━━━━━━━━━━━━━━━━━━\n𝙊𝙬𝙣𝙚𝙧 𝙈𝙞𝙖𝙣 𝘼𝙢𝙞𝙧`, mentions: arraytag, attachment: imglove}
        return api.sendMessage(msg, event.threadID, event.messageID)
                             }