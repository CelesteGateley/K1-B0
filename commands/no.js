module.exports = {
    name: "no",
    description: "Nooooooooo",
    aliases: [],
    usage: 'no',
    args: false,
    execute(message, args) {
        return message.channel.send('', {
            file: 'https://media.giphy.com/media/12XMGIWtrHBl5e/giphy.gif'
        });
    },
};