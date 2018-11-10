module.exports = {
    // The default name of the command
    name: "deckofmanythings",
    // Description of the command for the help menu
    description: "Draws a random card from the deck of many things",
    // Aliases that the command will also trigger
    aliases: [ "manythings", "domt" ],
    // Additional values that the command would require, to be added to help
    usage: '',
    // If the command REQUIRES arguments, then this should be set to true
    args: false,
    // Code to be executed when the command is run
    execute(message, args) {
        let deck_file;
        try {
            deck_file = require("../assets/many_things.json");
        } catch (error) {
            console.log("Deck of many things command attempted but many_things.json not configured.");
            return message.reply("This command hasn't been configured by the admin yet.");
        }
        let keys = Object.keys(deck_file);
        let card = keys[Math.floor(Math.random() * keys.length)];

        return message.reply("You drew **" + card + "**\n" + deck_file[card]);

    },
};