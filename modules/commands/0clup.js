const axios = require("axios");

module.exports.config = {
  name: "نادي",
  version: "1.0.0",
  role: 1,
  credits: "moussa",
  description: "انضمام الى نادي",
  commandCategory: "System",
  usages: "[threadID]",
  cooldowns: 0,
  hasPrefix: false
};

module.exports.handleReply = async function({ api, event, handleReply }) {
  const { threadID, messageID } = event;
  const args = event.body.split(" ");

  if (parseInt(event.senderID) !== parseInt(handleReply.author)) return;

  const predefinedGroups = handleReply.groups;
  const selectedGroupIndex = parseInt(args[0]) - 1;

  if (selectedGroupIndex < 0 || selectedGroupIndex >= predefinedGroups.length) {
    return api.sendMessage('رقم النادي غير صالح. الرجاء اختيار رقم صحيح من القائمة ', threadID);
  }

  const selectedGroup = predefinedGroups[selectedGroupIndex];

  try {
    const memberList = await api.getThreadInfo(selectedGroup.threadID);
    if (memberList.participantIDs.includes(event.senderID)) {
      return api.sendMessage(`لا يمكن إضافتك، أنت بالفعل في مجموعة الدردشة: \n${selectedGroup.threadName}`, threadID);
    }

    if (memberList.participantIDs.length >= 250) {
      return api.sendMessage(`لا يمكن إضافتك، مجموعة الدردشة ممتلئة: \n${selectedGroup.threadName}`, threadID);
    }

    await api.addUserToGroup(event.senderID, selectedGroup.threadID);
    return api.sendMessage(`لقد انضممت إلى مجموعة الدردشة: ${selectedGroup.threadName}`, threadID);
  } catch (error) {
    console.error("Error joining group chat", error);
    return api.sendMessage(`حدث خطأ أثناء الانضمام إلى مجموعة الدردشة: ${error.message}`, threadID);
  }
};

module.exports.run = async function({ api, event, args }) {
  try {
    const predefinedGroups = [
      { threadID: '7829326963776707', threadName: '꧁ঔৣ☬ V̼e̼g̼a̼s̼ C̼l̼u̼b̼  ☬ঔৣ꧂' }
    ];

    if (!args[0]) {
      const formattedList = predefinedGroups.map((group, index) =>
        `│${index + 1}. ${group.threadName}\n│𝐓𝐈𝐃: ${group.threadID}\n│`
      );
      const message = `╭─╮\n│قائمة النوادي المتاحة للانضمام :\n${formattedList.map(line => `${line}`).join("\n")}\n╰───────────ꔪ\nالحد الاقصى للاعضاء = 250\n\nللإنضمام، قم بالرد على هذه الرسالة برقم النادي الذي تريد الانضمام له.\nشروط الانضمام : "• ان يكون عمرك فوق 18 سنة\n• ان تحترم القواعد \n • ان تستمتع بكل ما لديك مرحبا بك🐉✊🏻"`;

      const sentMessage = await api.sendMessage(message, event.threadID);

      global.client.handleReply.push({
        name: this.config.name,
        author: event.senderID,
        messageID: sentMessage.messageID,
        groups: predefinedGroups,
        type: 'reply'
      });
    } else {
      const selectedGroupIndex = parseInt(args[0]) - 1;

      if (selectedGroupIndex < 0 || selectedGroupIndex >= predefinedGroups.length) {
        return api.sendMessage('رقم النادي غير صالح. الرجاء اختيار رقم صحيح من القائمة.', event.threadID);
      }

      const selectedGroup = predefinedGroups[selectedGroupIndex];

      const memberList = await api.getThreadInfo(selectedGroup.threadID);
      if (memberList.participantIDs.includes(event.senderID)) {
        return api.sendMessage(`لا يمكن إضافتك، أنت بالفعل في مجموعة الدردشة: \n${selectedGroup.threadName}`, event.threadID);
      }

      if (memberList.participantIDs.length >= 250) {
        return api.sendMessage(`لا يمكن إضافتك، مجموعة الدردشة ممتلئة: \n${selectedGroup.threadName}`, event.threadID);
      }

      await api.addUserToGroup(event.senderID, selectedGroup.threadID);
      return api.sendMessage(`لقد انضممت إلى مجموعة الدردشة: ${selectedGroup.threadName}`, event.threadID);
    }
  } catch (error) {
    console.error("Error joining group chat", error);
    return api.sendMessage(`حدث خطأ أثناء الانضمام إلى مجموعة الدردشة: ${error.message}`, event.threadID);
  }
};