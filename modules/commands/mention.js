module.exports.config = {
  name: "منشن",
  version: "1.0.0-beta-fixbyDungUwU",
  hasPermssion: 0,
  credits: "ZyrosGenZ-fixbyDungUwU",
  description: "البوت يرد عند الإشارة الى الادمن",
  commandCategory: "Other",
  usages: "",
  cooldowns: 1
};
module.exports.handleEvent = function({ api, event }) {
  if (event.senderID !== "100017985245260") {
    var aid = ["100017985245260"];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var msg = ["الادمن مشغول اترك له رسالة"];
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
    }
    }}
};
module.exports.run = async function({}) {
        }