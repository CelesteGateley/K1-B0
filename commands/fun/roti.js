const fs = require("fs");
const { randint } = require(appRoot + "/functions.js");

module.exports = {
    // The default name of the command
    name: "rulesoftheinternet",
    // The Category of the command (Used for help)
    category: "fun",
    // Description of the command for the help menu
    description: "Prints a random rule of the internet",
    // Aliases that the command will also trigger
    aliases: [ "roti" ],
    // Additional values that the command would require, to be added to help
    usage: '[number]',
    // If the command REQUIRES arguments, then this should be set to true
    args: false,
    // Code to be executed when the command is run
    execute(message, args) {
        let roti = fs.readFileSync(appRoot + "/assets/roti.txt", 'utf8').split("\n");
        let responseRandom = roti[randint(1, 102)];
        let response = roti[parseInt(args.join(" ")) - 1];

        if (args.join(" ") === "") {
            message.reply(responseRandom);
        } else {
            message.reply(response);
        }
    },
};