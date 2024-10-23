module.exports.config = {
  name: "adbot",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "YIN YAN",
  description: "معلومات حول البوت",
  commandCategory: "المعلومات",
  usages: "",
  cooldowns: 4,
  dependencies: {
    "request": "",
    "fs": ""
  }
};

module.exports.run = async({ api, event, args }) => {
  const fs = global.nodemodule["fs-extra"];
  const request = global.nodemodule["request"];
  const threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
  const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  
  if (args.length == 0) {
    return api.sendMessage(`يمكنك استخدام:\n\n${prefix}${this.config.name} user => للحصول على معلوماتك الشخصية.\n\n${prefix}${this.config.name} user @[Tag] => للحصول على معلومات الشخص المحدد.\n\n${prefix}${this.config.name} box => للحصول على معلومات المجموعة (عدد الأعضاء، ...) \n\n${prefix}${this.config.name} admin => للحصول على معلومات الأدمن الخاصة بالبوت.`, event.threadID, event.messageID);
  }

  if (args[0] == "box") {
    if (args[1]) {
      let threadInfo = await api.getThreadInfo(args[1]);
      let imgg = threadInfo.imageSrc;
      var gendernam = [];
      var gendernu = [];
      
      for (let z in threadInfo.userInfo) {
        var gender = threadInfo.userInfo[z].gender;
        if (gender == "MALE") {
          gendernam.push(gender);
        } else {
          gendernu.push(gender);
        }
      }
      
      var nam = gendernam.length;
      var nu = gendernu.length;
      let approvalMode = threadInfo.approvalMode;
      var approvalStatus = approvalMode == false ? "معطل" : "مفعل";

      if (!imgg) {
        return api.sendMessage(`اسم المجموعة: ${threadInfo.threadName}\nTID: ${args[1]}\nالموافقة: ${approvalStatus}\nالإيموجي: ${threadInfo.emoji}\nالمعلومات: \n» ${threadInfo.participantIDs.length} عضو و ${threadInfo.adminIDs.length} مشرف.\n» منهم ${nam} ذكر و ${nu} أنثى.\n» إجمالي عدد الرسائل: ${threadInfo.messageCount}.`, event.threadID, event.messageID);
      } else {
        var callback = () => api.sendMessage({
          body: `اسم المجموعة: ${threadInfo.threadName}\nTID: ${args[1]}\nالموافقة: ${approvalStatus}\nالإيموجي: ${threadInfo.emoji}\nالمعلومات: \n» ${threadInfo.participantIDs.length} عضو و ${threadInfo.adminIDs.length} مشرف.\n» منهم ${nam} ذكر و ${nu} أنثى.\n» إجمالي عدد الرسائل: ${threadInfo.messageCount}.`,
          attachment: fs.createReadStream(__dirname + "/cache/1.png")
        }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);

        return request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
      }
    }
  }

  if (args[0] == "admin") {
    var callback = () => api.sendMessage({
      body: `———» معلومات الأدمن «———\n❯ الاسم: YIN YAN\n❯ فيسبوك: https://www.facebook.com/profile.php?id=61561175994395\n❯ شكراً لاستخدامك بوت ${global.config.BOTNAME}`,
      attachment: fs.createReadStream(__dirname + "/cache/1.png")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"));
    
    return request(encodeURI(`https://graph.facebook.com/61561175994395/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
      .pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
      .on('close', () => callback());
  }

  if (args[0] == "user") {
    // التعامل مع أوامر المستخدم هنا
  }
};
