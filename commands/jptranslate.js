const translate = require("google-translate-api");
const wanakana = require("wanakana");
const { debug } = require("../config.json");

module.exports = {
    name: "jptranslate",
    description: "Translate given text into japanese",
    aliases: ["jpt", "jptrans"],
    usage: '(String)',
    args: true,
    execute(message, args) {
        translate(args.join(" "), {to: 'ja'}).then(res => {
            return message.channel.send("\n```"
                + "\nInput Text: " + args.join(" ")
                + "\nTranslated: " + res.text
                + "\nRomanji: " + wanakana.toRomaji(res.text)
                + "```");
        }).catch(err => {
            if (debug) {
                console.error(`Google Translate API refused to translate: \"${args.join(" ")}\"\n`, err);
            } else {
                console.error(`Google Translate API refused to translate: \"${args.join(" ")}\"`)
            }
            return message.reply("An error occurred whilst processing your request. Try again later!");
        });
    },
};