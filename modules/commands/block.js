module.exports.config = {
	name: "block",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "Aadi Gupta",
	description: "Block user",
  usages: "[uid/fb link/mention]",
	commandCategory: "...",
	cooldowns: 2
};

module.exports.run = async ({ api, event,args }) => {
const axios = require("axios");
if (args.join().indexOf('@') !== -1){ var id = Object.keys(event.mentions) }
      else var id = args[1];
 if (args.join().indexOf(".com/") !== -1) {
        const res = await axios.get(`https://api.reikomods.repl.co/sus/fuid?link=${args[1]}`);
var id = res.data.result || args[1];
      }
//let text = args[0];
if(!id) return api.sendMessage(`『 Wrong format 』\n『 Use message block [uid/fb link/mention] (to block user) 』\n『 ${this.config.name} unblock [uid] (to unblock user)`, event.threadID, event.messageID);
if(!args[1]) return api.sendMessage(`『 Wrong format 』\n『 Use message block [uid] (to block user) 』\n『 ${this.config.name} unblock [uid/fb link/mention] (to unblock user) 』`,event.threadID, event.essageID);
if (args[0] == "block"){
api.changeBlockedStatus(`${id}`, true, (err) => {
        if(err) return api.sendMessage(`${err}`, event.threadID, event.messageID);
  else return api.sendMessage("『 Successfully blocked user 』", event.threadID, event.messageID);
    });
}
else if (args[0] == "unblock"){
  api.changeBlockedStatus(`${id}`, false, (err) => {
        if(err) return api.sendMessage(`${err}`, event.threadID, event.messageID);
  else return api.sendMessage("『 Successfully unblocked user 』", event.threadID, event.messageID);
    });
  }
}