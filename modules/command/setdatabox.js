module.exports.config = {
    name: "setdatabox",
    version: "1.0",
    hasPermssion: 2,
    credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    description: "Set new data of boxes into data",
    commandCategory: "System",
    usages: "",
    cooldowns: 5,
    
};
module.exports.run = async function ({ event, args, api, Threads }) { 
const { threadID } = event;
const { setData, getData } = Threads;
var inbox = await api.getThreadList(100, null, ['INBOX']);
  let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);
  const lengthGroup = list.length
  for (var groupInfo of list) {
    console.log(`data has been updated box ID: ${groupInfo.threadID}`)
    var threadInfo = await api.getThreadInfo(groupInfo.threadID);
    threadInfo.threadName;
    await Threads.setData(groupInfo.threadID, { threadInfo });
  }
    console.log(`data has been updated ${lengthGroup} box`)
    return api.sendMessage(`data has been updated ${lengthGroup} box`, threadID)
}