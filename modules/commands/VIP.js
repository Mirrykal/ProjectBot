const fs = require("fs");

// قراءة ملف specialUsers.json وتخزينه في متغير
const specialUsersFilePath = __dirname + '/specialUsers.json';
const specialUsers = JSON.parse(fs.readFileSync(specialUsersFilePath, 'utf8'));

// معرف المسؤول المخول بإضافة مستخدمين مميزين
const adminID = "61561175994395";  // استبدل YOUR_ADMIN_ID بمعرفك الخاص

module.exports.config = {
  name: "vip",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "مستخدم مميز", 
  description: "ردود خاصة للمستخدمين المميزين",
  commandCategory: "تسلية",
  usages: "تسلية",
  cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, senderID, body } = event;

  if (specialUsers[senderID]) {
    const responses = specialUsers[senderID];
    for (const trigger in responses) {
      if (body.startsWith(trigger)) {
        var specialMsg = {
          body: responses[trigger][Math.floor(Math.random() * responses[trigger].length)]
        };
        api.sendMessage(specialMsg, threadID);
        return;
      }
    }
  }
};

module.exports.run = function({ api, event, args, client, __GLOBAL }) {
  var { threadID, senderID } = event;

  if (senderID === adminID) {
    if (args[0] === "add" && args.length > 2) {
      const newUserID = args[1];
      const trigger = args[2];
      const response = args.slice(3).join(" ");

      if (!specialUsers[newUserID]) {
        specialUsers[newUserID] = {};
      }

      if (!specialUsers[newUserID][trigger]) {
        specialUsers[newUserID][trigger] = [];
      }

      specialUsers[newUserID][trigger].push(response);

      fs.writeFileSync(specialUsersFilePath, JSON.stringify(specialUsers, null, 2), 'utf8');

      api.sendMessage(`تم إضافة الرد: "${response}" للمستخدم: ${newUserID} عند الكلمة: "${trigger}"`, threadID);
    } else {
      api.sendMessage("الاستخدام: add [userID] [trigger] [response]", threadID);
    }
  } else {
    api.sendMessage("عذرًا، أنت غير مخول لإضافة مستخدمين مميزين.", threadID);
  }
};