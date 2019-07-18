const sentiment = require("node-sentiment");

module.exports = {
    name: "sentiment",
    // The Category of the command (Used for help)
    category: "utility",
    description: "Uses node-sentiment to see if a statement is positive or negative",
    aliases: [],
    usage: '(statement)',
    args: true,
    execute(message, args) {
        let results = sentiment(args.join(" "));
        let response = "```YAML"
            + "\nScore: " + results['score']
            + "\nVote: " + results['vote']
            + "\nWords: " + results['words']
            + "\nPositive: " + results['positive']
            + "\nNegative: " + results['negative']
            + "\nNegation: " + results['negation']
            + "```";
        return message.channel.send(response);
    },
};