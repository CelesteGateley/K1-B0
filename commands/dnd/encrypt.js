const crypto = require("crypto");
const algo = 'aes-256-cbc';

module.exports = {
    // The default name of the command
    name: "encrypt",
    // The Category of the command (Used for help)
    category: "dnd",
    // Description of the command for the help menu
    description: "Allows you to encrypt a string",
    // Aliases that the command will also trigger
    aliases: [],
    // Additional values that the command would require, to be added to help
    usage: '(passcode) (string)',
    // If the command REQUIRES arguments, then this should be set to true
    args: true,
    // Code to be executed when the command is run
    execute(message, args) {
        if (args.length < 2) { return message.reply('Command requires 2 arguments, ' + args.length + ' provided.'); }
        let passcode = args[0];
        args.splice(0,1);
        let cipher = crypto.createCipher(algo, passcode);
        let res = cipher.update(args.join(" "), 'utf8', 'hex');
        res += cipher.final('hex');
        let result = "$" + passcode + "$" + res;
        return message.reply("This encrypted to the following message: \n`" + result + "`");
    },
};