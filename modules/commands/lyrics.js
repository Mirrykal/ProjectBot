const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
  name: "lyrics",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Rishad",
  description: "Fetch lyrics of a song",
  commandCategory: "media",
  usages: "lyrics [song name]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const query = args.join(" ");
    const response = await axios.get(`https://rishadapi.rishad100.repl.co/lyrics?query=${encodeURIComponent(query)}`);
    const data = response.data;

    const imageResponse = await axios.get(data.image, { responseType: 'arraybuffer' });
    fs.writeFileSync(__dirname + '/cache/lyrics.png', Buffer.from(imageResponse.data));

    return api.sendMessage({
      body: `Title: ${data.title}\nArtist: ${data.artist}\n\nLyrics:\n${data.lyrics}`,
      attachment: fs.createReadStream(__dirname + '/cache/lyrics.png')
    }, event.threadID);
  } catch (err) {
    console.error(err);
    return api.sendMessage('An error occurred while fetching lyrics.', event.threadID);
  }
};