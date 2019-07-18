module.exports = {
    // The default name of the command
    name: "listdeck",
    // The Category of the command (Used for help)
    category: "dnd",
    // Description of the command for the help menu
    description: "Lists all cards in the Deck of Many Things",
    // Aliases that the command will also trigger
    aliases: [ 'ld', 'listmany'],
    // Additional values that the command would require, to be added to help
    usage: '',
    // If the command REQUIRES arguments, then this should be set to true
    args: false,
    // Code to be executed when the command is run
    execute(message, args) {
        let deck_file;
        try {
            deck_file = require(appRoot + "/assets/many_things.json");
        } catch (error) {
            console.log("Deck of many things command attempted but many_things.json not configured.");
            return message.reply("This command hasn't been configured by the admin yet.");
        }
        let keys = Object.keys(deck_file);
        let response = '```YAML\n';

        for (let key in keys) {
            if (keys[key].startsWith("__")) { continue; }
            response += keys[key] + ": " + deck_file[keys[key]] + '\n';
        }
        response += "```"
        return message.channel.send(response);

    },
};