const axios = require('axios');

module.exports.config = {
    name: "roleplay",
    version: "1.0.1",
    hasPermission: 0,
    credits: "عمر",
    description: "Interact with the Roleplay AI with different personalities and translate the response to Arabic",
    commandCategory: "fun",
    usages: "/roleplay <role> <query>",
    cooldowns: 5,
};

const availableRoles = [
    "friendly",
    "sarcastic",
    "joker",
    "storyteller",
    "pare",
    "geek",
    "motivational",
    "philosopher",
    "detective",
    "mentor",
    "informative",
    "legal",
    "music_composer",
    "ethics_advisor"
];

module.exports.run = async function ({ api, args, event }) {
    if (args.length < 2) {
        return api.sendMessage("يرجى تقديم دور واستفسار. الاستخدام: /roleplay <role> <query>", event.threadID, event.messageID);
    }

    const role = args[0];
    const query = args.slice(1).join(" ");

    if (!availableRoles.includes(role)) {
        return api.sendMessage(`دور غير صالح. الأدوار المتاحة هي: ${availableRoles.join(", ")}`, event.threadID, event.messageID);
    }

    try {
        const aiResponse = await axios.get(`https://openapi-idk8.onrender.com/roleplay?query=${encodeURIComponent(query)}&role=${role}`);
        const answer = aiResponse.data.response;

        console.log("AI Response:", answer); // Log the AI response for debugging

        try {
            const translationResponse = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ar&dt=t&q=${encodeURIComponent(answer)}`);
            const translatedAnswer = translationResponse.data[0].map(item => item[0]).join('');

            console.log("Translated Response:", translatedAnswer); // Log the translated response for debugging
            await api.sendMessage(translatedAnswer, event.threadID, event.messageID);
        } catch (translateError) {
            console.error("Translation Error:", translateError);
            api.sendMessage(`حدث خطأ أثناء ترجمة الاستجابة إلى العربية: ${translateError.message}`, event.threadID, event.messageID);
        }
    } catch (apiError) {
        console.error("API Error:", apiError);
        api.sendMessage(`حدث خطأ أثناء جلب الاستجابة من API: ${apiError.message}`, event.threadID, event.messageID);
    }
};