const axios = require("axios");
const a = 'xyz';

module.exports.config = {
  name: "sing",
  version: "1.1",
  hasPermission: 0,
  credits: "YAN",
  description: "تشغيل مقطع موسيقي من خلال رابط معين.",
  commandCategory: "الموسيقى",
  usages: "اكتب الأمر متبوعًا باسم الأغنية لتشغيل الموسيقى.",
  cooldowns: 5,
  dependencies: {
    "axios": ""
  }
};

module.exports.run = async function ({ api, event, args }) {
  const songName = args.join(" ");
  if (!songName) return api.sendMessage("يرجى تقديم اسم أغنية صحيح!", event.threadID, event.messageID);

  api.setMessageReaction("⏳", event.messageID, () => {}, true);

  try {
    const url = `https://smfahim.${a}/ytb/audio?search=${encodeURIComponent(songName)}`;
    const { data: { audioUrl, title } } = await axios.get(url);

    await api.sendMessage({
      body: title,
      attachment: await global.utils.getStreamFromURL(audioUrl, "music.mp3")
    }, event.threadID, event.messageID);

    api.setMessageReaction("✅", event.messageID, () => {}, true);

  } catch (error) {
    console.error(error);
    api.sendMessage("حدث خطأ أثناء جلب الأغنية.", event.threadID, event.messageID);
  }
};
