module.exports = {
    name: "no",
    // The Category of the command (Used for help)
    category: "fun",
    description: "Nooooooooo",
    aliases: [],
    usage: '',
    args: false,
    execute(message, args) {
        return message.channel.send('', {
            file: 'https://media.giphy.com/media/12XMGIWtrHBl5e/giphy.gif'
        });
    },
};