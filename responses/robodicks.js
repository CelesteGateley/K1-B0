module.exports = {
    // List of Keywords/Phrases that will trigger the response. Should be in lowercase.
    triggers: [ "do robots have dicks" ],
    // Chance out of 100 that the response will trigger. 100 means that it will always trigger.
    chance: 100,
    // Priority of the trigger. If you have 2 responses that have the same trigger, the lower value priority will be used first.
    priority: 0,
    // Code to execute when the response is triggered.
    execute(message) {
        message.channel.send('', {
            file: 'https://cdn.discordapp.com/attachments/263015254064103424/488406716220964878/310.png'
        });
    },
};