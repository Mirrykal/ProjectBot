module.exports.config = {
  name: "idioms",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Choru",
  description: "idioms learning",
  commandCategory: "Hình Ảnh",
  usages: "pogiastronaut",
  cooldowns: 3,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
  var link = [
     "https://i.imgur.com/Cup3pVU.jpeg",
     "https://i.imgur.com/BKc3NsD.jpeg",
     "https://i.imgur.com/Tk18DYy.png",
     "https://i.imgur.com/rgp2eiD.png",
    ];
	 var callback = () => api.sendMessage({body:`learning school 🏫 : ${link.length}`,attachment: fs.createReadStream(__dirname + "/cache/choru.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/choru.jpg"));	
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/choru.jpg")).on("close",() => callback());
   };