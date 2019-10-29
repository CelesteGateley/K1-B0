const Discord = require("discord.js");
const path = require("path");
const fs = require("fs");
const config = require("./config.json");
const modules = require("./modules.json");
// Sets the app root for use in other files, and sets the config version for checking later
global.appRoot = path.resolve(__dirname);
const currentConfigVersion = 3;

// Sets up the client, and collections required for storing the commands and responses
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.responses = new Discord.Collection();

// Initialize all modules
for (let x in modules) {
    const commandFiles = fs.readdirSync('./commands/' + x).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) { const command = require(`./commands/` + x + `/${file}`); client.commands.set(command.name, command);  }
}

// Initialize responses
if (config.enableChatResponseFeatures) {
    const responseFiles = fs.readdirSync('./responses').filter(file => file.endsWith('.js'));
    for (const file of responseFiles) {
        const response = require(`./responses/${file}`);
        for (const trigger of response.triggers) { client.responses.set("(^|\\s)" + trigger + "($|\\.|\\?|,)", response); }
        // Custom Sort function for the response modules, using priority as a basis
        client.responses.sort(function (a, b) { if (a.priority < b.priority) { return 1; } else if (a.priority === b.priority) { return 0;} else { return -1; }});
    }
}

// Initialize the Text Chanel -> Voice feature
let useVoice = config.enableVoiceTextChannel;
if (config.enableVoiceTextChannel && (config.voiceChannel === "" || config.textChannelRole === "")) {
    console.error("Voice channel has been enabled, but one of the required config values is unset. This function has been disabled.")
    useVoice = false;
}

// Check if the config is out of date
if (config.configVersion !== currentConfigVersion) {
    console.error("Config out of date! Please update and try again!");
    process.exit(1);
}

// Log that the bot has started and then set the activity
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity(config.prefix + 'help for a list of commands!');
});

// This section manages what happens when a member sends a message
client.on('message', message => {
    if (message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    let responded = false;
    client.responses.forEach(function(value, key) {
        if (message.content.toLowerCase().match(key) && !responded) {
            if (Math.random() <= value.chance / 100) { value.execute(message); responded = true; }
        }
    });


    if (!message.content.startsWith(config.prefix)) return;

    const command = client.commands.get(commandName)
                || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (command.args && !args.length) {
        return message.channel.send(`You didn't provide any arguments, ${message.author}`);
    }

    try {
        command.execute(message, args);
        if (message.guild !== null) {
            message.delete()
        }
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

client.on('voiceStateUpdate', (before, after) => {
    if (useVoice) {
        let oldChannel = before.voiceChannelID;
        let newChannel = after.voiceChannelID;

        if (config.voiceChannel.contains(newChannel)) {
            try {
                after.addRole(config.textChannelRole);
            } catch (error) {
                if (config.debug) {
                    console.error(`An error occurred when adding the Text Channel Role to ${after.user.tag}`, error);
                } else {
                    console.error(`An error occurred when adding the Text Channel Role to ${after.user.tag}`);
                }
            }
        } else if (config.voiceChannel.contains(oldChannel) && !config.voiceChannel.contains(newChannel)) {
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