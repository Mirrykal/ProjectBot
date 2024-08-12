module.exports.config = {
  name: "زوجيني",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "عمر",
  description: "زواج من حد عشوائي",
  commandCategory: "ترفية",
  usages: " ",
  cooldowns: 0,
  dependencies: {},
};

module.exports.run = async function ({ api, event, Users, Currencies }) {
  const axios = global.nodemodule["axios"];
  const fs = global.nodemodule["fs-extra"];
  const TOKEN = "6628568379%7Cc1e620fa708a1d5696fb991c1bde5662";

  const data = await Currencies.getData(event.senderID);
  const money = data.money;

  if (money < -1) {
    return api.sendMessage(`ماعندك مهر امشي اعمل وتعال `, event.threadID, event.messageID);
  }

  const participants = event.participantIDs.filter(id => id !== event.senderID);
  const senderData = await Users.getData(event.senderID);
  const senderGender = senderData.gender;

  let partnerID = null;
  for (const participantID of participants) {
    const userData = await Users.getData(participantID);
    const userGender = userData.gender;

    if (userGender !== senderGender) {
      partnerID = participantID;
      break;
    }
  }

  if (!partnerID) {
    partnerID = participants[Math.floor(Math.random() * participants.length)];
  }

  const partnerData = await Users.getData(partnerID);
  const senderName = senderData.name;
  const partnerName = partnerData.name;

  // Download and process profile pictures
  const senderAvatarUrl = `https://graph.facebook.com/${event.senderID}/picture?type=large&access_token=${TOKEN}`;
  const partnerAvatarUrl = `https://graph.facebook.com/${partnerID}/picture?type=large&access_token=${TOKEN}`;

  const [senderAvatar, partnerAvatar] = await Promise.all([
    axios.get(senderAvatarUrl, { responseType: 'arraybuffer' }),
    axios.get(partnerAvatarUrl, { responseType: 'arraybuffer' })
  ]);

  const senderPath = `${__dirname}/cache/sender.png`;
  const partnerPath = `${__dirname}/cache/partner.png`;

  fs.writeFileSync(senderPath, Buffer.from(senderAvatar.data, 'utf-8'));
  fs.writeFileSync(partnerPath, Buffer.from(partnerAvatar.data, 'utf-8'));

  const romancePercentage = Math.floor(Math.random() * 101);
  const msg = {
    body: `عندنا زوجان هنا \nنسبة الرومنسية: ${romancePercentage}%\n${senderName} ${partnerName}`,
    mentions: [
      { id: event.senderID, tag: senderName },
      { id: partnerID, tag: partnerName }
    ],
    attachment: [fs.createReadStream(senderPath), fs.createReadStream(partnerPath)]
  };

  return api.sendMessage(msg, event.threadID, event.messageID);
};
