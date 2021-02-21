const discord = require("discord.js");
const { embedColor, prefix } = require('../../config.json');

module.exports = {
    // The default name of the command
    name: "color",
    // The Category of the command (Used for help)
    category: "utility",
    // Description of the command for the help menu
    description: "Set your color",
    // Aliases that the command will also trigger
    aliases: [],
    // Additional values that the command would require, to be added to help
    usage: '(color) [user]',
    // If the command REQUIRES arguments, then this should be set to true
    args: true,
    // Code to be executed when the command is run
    execute(message, args) {
        if (args[0] === "setup") {
            if (message.guild.members.cache.get(message.author.id).permissions.has("ADMINISTRATOR")) {
                message.guild.roles.create({
                    data: {name: 'ColorSetup',},
                    reason: 'Allows the bot to setup colors. Remove to disable colors',
                })
                    .then(role => {
                        message.guild.members.cache.get(message.client.user.id).roles.add(role.id);
                    });
                return message.reply("Colors have been setup");
            }
        }
        if (args[0] === "cleanup") {
            if (message.guild.members.cache.get(message.author.id).permissions.has("ADMINISTRATOR")) {
                message.guild.roles.fetch().then(roles => {
                    roles.cache.each(role => {
                        if (role.name.includes("Color")) {
                            role.delete();
                        }
                    });
                });
                return message.reply("All color roles have been removed");
            }
        }
        if (args[0] === "remove") {
            message.member.roles.cache.each(role => {
                if (role.name.includes("Color")) {
                    role.delete();
                }
            });
            return message.reply("Your color has been removed!");
        }
        if (args[0] === "info") {
            let embed = new discord.MessageEmbed().setColor(embedColor);
            embed.setTitle("How to use the color command");
            embed.addField(prefix + "color setup (ADMIN)", "This sets up the color command to be used by everyone");
            embed.addField(prefix + "color cleanup (ADMIN)", "Removes all color roles and disables color");
            embed.addField(prefix + "color (hex)", "Set your color. For a color picker, " +
                "go to https://www.rapidtables.com/web/color/RGB_Color.html");
            embed.addField(prefix + "color remove", "Removes your colors");
            return message.reply(embed);
        }
        if (!message.guild.members.cache.get(message.client.user.id).roles.cache.some(r=>["ColorSetup"].includes(r.name))) {
            return message.reply("Color is not yet setup!")
        }
        if (args[0].match(/^#([0-9a-f]{6})$/i)) {}
        else if (args[0].match(/^([0-9a-f]{6})$/i)) args[0] = "#" + args[0];
        else return message.reply("That is an invalid color");

        message.guild.roles.create({
            data: {name: 'Color'+args[0], color: args[0]},
            reason: 'Added a color role',
        }).then(role => message.member.roles.add(role.id));


        return message.reply("Your color has been setup!")
    },
};