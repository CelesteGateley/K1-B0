const discord = require("discord.js");
const cron = require('node-cron')
const fs = require('fs');
const { embedColor, prefix } = require('../../config.json');
let taskScheduled = false;

const jsonFile = global.appRoot + "/randomizers.json"

setInterval(() => {
    let data = read()
    for (let key in data) {
        if (data[key] === null) continue;
        global.client.guilds.cache.get(key).roles.cache.get(data[key]).setColor(generateRandomHexColor());
    }
}, 1000)

function write(json) {
    let data = JSON.stringify(json);
    fs.writeFileSync(jsonFile, data);
}

function read() {
    let file = fs.readFileSync(jsonFile);
    return JSON.parse(file);
}

function generateRandomHexColor() {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

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
                message.guild.roles.create({
                    data: {name: 'ColorRandomizer', color: generateRandomHexColor()},
                    reason: 'RandomColors role',
                }).then(role => {
                    let data = read();
                    data[message.guild.id] = role.id;
                    write(data);
                });
                return message.reply("Colors have been setup");
            }
        }
        if (args[0] === "cleanup") {
            if (message.guild.members.cache.get(message.author.id).permissions.has("ADMINISTRATOR")) {
                message.guild.roles.fetch().then(roles => {
                    roles.cache.each(role => {
                        let data = read();
                        data[message.guild.id] = null;
                        write(data);
                        if (role.name.includes("Color")) {
                            role.delete();
                        }
                    });
                });
                return message.reply("All color roles have been removed");
            }
        }
        if (!message.guild.members.cache.get(message.client.user.id).roles.cache.some(r=>["ColorSetup"].includes(r.name))) {
            return message.reply("Color is not yet setup!")
        }
        if (args[0] === "remove") {
            message.member.roles.cache.each(role => {
                if (role.name.includes("Color")) {
                    role.delete();
                }
            });
            return message.reply("Your color has been removed!").then((msg) => { setTimeout(() => msg.delete(), 10000)});
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
        if (args[0] === "randomize") {
            let data = read();
            message.member.roles.add(data[message.guild.id]).catch(err => console.log(err));
            return message.reply("Your color has been randomized").then((msg) => { setTimeout(() => msg.delete(), 10000)});
        }

        if (args[0].match(/^#([0-9a-f]{6})$/i)) {}
        else if (args[0].match(/^([0-9a-f]{6})$/i)) args[0] = "#" + args[0];
        else return message.reply("That is an invalid color").then((msg) => { setTimeout(() => msg.delete(), 10000)});

        message.guild.roles.create({
            data: {name: 'Color'+args[0], color: args[0]},
            reason: 'Added a color role',
        }).then(role => message.member.roles.add(role.id));


        return message.reply("Your color has been setup!").then((msg) => { setTimeout(() => msg.delete(), 10000)});
    },
};