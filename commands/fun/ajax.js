module.exports = {
    name: 'ajax',
    // The Category of the command (Used for help)
    category: "fun",
    description: 'No Ben, Just No',
    aliases: [],
    usage: '',
    args: false,
    execute(message, args) {
        return message.reply('<@230646636387368960> No More AJAX', {
            files: [appRoot + "/assets/images/ajax.png"]
        }).catch(err => console.error(err));
    }
};