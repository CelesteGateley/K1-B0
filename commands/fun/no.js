module.exports = {
    name: "no",
    // The Category of the command (Used for help)
    category: 3,
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