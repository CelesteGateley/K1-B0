const translate = require("google-translate-api");
const wanakana = require("wanakana");

module.exports = {
    name: "jptranslate",
    description: "Translate given text into japanese",
    aliases: ["jpt", "jptrans"],
    usage: 'jptranslate (String)',
    args: true,
    execute(message, args) {
        translate(args.join(" "), {to: 'ja'}).then(res => {
            return message.channel.send("\n```"
                + "\nInput Text: " + args.join(" ")
                + "\nTranslated: " + res.text
                + "\nRomanji: " + wanakana.toRomaji(res.text)
                + "```");
        }).catch(err => {
            console.error(err);
            return message.reply("An error occurred whilst processing your request. Try again later!");
        });
    },
};