module.exports = {
    // The default name of the command
    name: "wildmagic",
    // Description of the command for the help menu
    description: "Generates a Wild Magic Effect",
    // Aliases that the command will also trigger
    aliases: [ 'wm' ],
    // Additional values that the command would require, to be added to help
    usage: '[Chance]',
    // If the command REQUIRES arguments, then this should be set to true
    args: false,
    // Code to be executed when the command is run
    execute(message, args) {
        let wildmagic = require("../assets/wildmagic.json");
        let calc = false;
        if (args.length > 0) {
            calc = true;
            if (!isNaN(Number(args[0]))) {
                if ((Math.floor(Math.random() * 100)+1) > args[0]) {
                    return message.reply("Your magic succeeded!!");
                }
            }
        }
        let keys = Object.keys(wildmagic);
        let effect = wildmagic[keys[Math.floor(Math.random() * keys.length)]];
        let response = "";
        if (calc) {
            response += "***Your wild magic has surged!!***\n"
        }
        response += "**Effect:** " + effect;

        return message.reply(response);
    },
};