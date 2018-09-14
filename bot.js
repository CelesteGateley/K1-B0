const Discord = require("discord.js");
const fs = require("fs");
const sentiment = require("node-sentiment");
const config = require("./config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

let roboTimeout = new Date() / 1000;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(config.prefix + 'help for a list of commands!');
});

client.on('message', message => {
    if (message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (config.enableChatResponseFeatures) {
        if (message.content.toUpperCase().includes("DO ROBOTS HAVE DICKS")) {
            message.channel.send('', {
                file: 'https://cdn.discordapp.com/attachments/263015254064103424/488406716220964878/310.png'
            });
        } else if (message.content.toUpperCase().includes("ROBOT") || message.content.toUpperCase().includes("BOT")
            || message.content.toUpperCase().includes("K1-B0") || message.content.toUpperCase().includes("KII-BO")) {
            if ((sentiment(message.content)['score'] < 0)
                && (new Date() / 1000) - roboTimeout >= parseInt(config.robophobicTimeout)) {
                message.reply('THAT\'S ROBOPHOBIC!');
                roboTimeout = new Date() / 1000;
            }
        }
    }

    if (!message.content.startsWith(config.prefix) || !client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.args && !args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author}`);
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

client.on('voiceStateUpdate', (before, after) => {
    if (config.enableChatResponseFeatures) {
        let oldChannel = before.voiceChannelID;
        let newChannel = after.voiceChannelID;

        if (newChannel === config.voiceChannel) {
            try {
                after.addRole(config.textChannelRole);
            } catch (error) {
                if (config.debug) {
                    console.error(`An error occurred when adding the Text Channel Role to ${after.user.tag}`, error);
                } else {
                    console.error(`An error occurred when adding the Text Channel Role to ${after.user.tag}`);
                }
            }
        } else if (oldChannel === config.voiceChannel && newChannel !== config.voiceChannel) {
            try {
                after.removeRole(config.textChannelRole);
            } catch (error) {
                if (config.debug) {
                    console.error(`An error occurred when removing the Text Channel Role from ${after.user.tag}`, error);
                } else {
                    console.error(`An error occurred when adding the Text Channel Role from ${after.user.tag}`);
                }
            }
        }
    }
});

client.login(config.token);