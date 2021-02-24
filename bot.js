const Discord = require("discord.js");
const path = require("path");
const fs = require("fs");
const config = require("./config.json");
const modules = require("./modules.json");
// Sets the app root for use in other files, and sets the config version for checking later
global.appRoot = path.resolve(__dirname);
const currentConfigVersion = 6;

// Sets up the client, and collections required for storing the commands and responses
const client = new Discord.Client();
global.client = client;
client.commands = new Discord.Collection();
client.responses = new Discord.Collection();

if (!fs.existsSync('randomizers.json')) { fs.writeFileSync('randomizers.json', "{}"); }

const jsonFile = global.appRoot + "/randomizers.json"

function generateRandomHexColor() {
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}


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
        for (const trigger of response.triggers) { client.responses.set("\\b(\\w*" + trigger + "\\w*)\\b", response); }
        // Custom Sort function for the response modules, using priority as a basis
        client.responses.sort(function (a, b) { if (a.priority < b.priority) { return 1; } else if (a.priority === b.priority) { return 0;} else { return -1; }});
    }
}

// Initialize the Text Chanel -> Voice feature
let useVoice = config.enableVoiceTextChannel;
if (config.enableVoiceTextChannel && (config.voiceChannel === {})) {
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
    console.log(`Logged in as ${client.user.tag} at ${new Date()}!`);
    client.user.setActivity(config.prefix + 'help for a list of commands!');
});

// This section manages what happens when a member sends a message
client.on('message', message => {
    if (message.author.bot) return;

    const args = message.content.slice(config.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    let responded = false;
    client.responses.forEach(function(value, key) {
        let regex = new RegExp(key, "gi");
        if (regex.test(message.content) && !responded) {
            if (Math.random() <= value.chance / 100) {
                value.execute(message); responded = true;
            }
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
        if (before.channelID === after.channelID) return;
        if (before.channelID in config.voiceChannel) {
            try {
                after.guild.channels.cache.get(config.voiceChannel[before.channelID]).permissionOverwrites.get(before.member.id).delete();
            } catch (error) {
                if (config.debug) {
                    console.error(`An error occurred when removing Text Channel for Voice permissions on ${after.member.name}`, error);
                } else {
                    console.error(`An error occurred when removing Text Channel for Voice permissions on ${after.member.name}`);
                }
            }
        }
        if (after.channelID in config.voiceChannel) {
            try {
                after.guild.channels.cache.get(config.voiceChannel[after.channelID]).createOverwrite(after.member.user, { VIEW_CHANNEL: true });
            } catch (error) {
                if (config.debug) {
                    console.error(`An error occurred when adding Text Channel for Voice permissions on ${after.member.name}`, error);
                } else {
                    console.error(`An error occurred when adding Text Channel for Voice permissions on ${after.member.name}`);
                }
            }
        }
    }
});

client.login(config.token);