const discord = require("discord.js");
const { embedColor } = require('../../config.json');

module.exports = {
    name: "info",
    category: 1,
    description: "Displays information about the server",
    aliases: ['about'],
    usage: '',
    args: false,
    execute(message, args) {
        let info_file;
        try {
            info_file = require(appRoot + "/assets/info.json");
        } catch (error) {
            console.log("Info command attempted but info.json not configured.");
            return message.reply("This command hasn't been configured by the admin yet.");
        }
        let x;
        let counter = 0;
        let embed = new discord.RichEmbed().setColor(embedColor);
        for (x in info_file) {
            if (counter === 0) {
                embed.setTitle(x);
                embed.setDescription(info_file[x]);
                counter++;
                continue;
            }
            embed.addField(x, info_file[x]);
        }
        return message.channel.send(embed);

    },
};