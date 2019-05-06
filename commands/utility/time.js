const moment = require('moment-timezone');

module.exports = {
    name: "time",
    // The Category of the command (Used for help)
    category: 2,
    description: "Displays the current time in a given timezone",
    aliases: ['current-time', 'ct'],
    usage: '[hours] [minutes] [seconds] or time [en/on/sa] [24hr Time]',
    args: false,
    execute(message, args) {
        let format = 'YYYY-MMMM-DD hh:mm:ss A';
        let uk_raw = moment().tz("Europe/London");
        let ontario_raw = moment().tz("America/Toronto");
        let south_africa_raw = moment().tz("Africa/Johannesburg");
        let parse = false;

        if (args.length) {
            parse = isNaN(parseInt(args[0]));
        }

        if (args.length > 1 && parse) {
            let time;
            let date_en = uk_raw.format('YYYY-MM-DD') + ' ';
            let date_on = ontario_raw.format('YYYY-MM-DD') + ' ';
            let date_sa = south_africa_raw.format('YYYY-MM-DD') + ' ';
            let eng = "";
            let ont = "";
            let saf = "";
            switch (args[0].toLowerCase()) {
                case 'en':
                    time = moment.tz(date_en + args[1], "Europe/London");
                    eng = time.tz("Europe/London").format(format);
                    ont = time.tz("America/Toronto").format(format);
                    saf = time.tz("Africa/Johannesburg").format(format);
                    break;
                case 'on':
                    time = moment.tz(date_on + args[1], "America/Toronto");
                    eng = time.tz("Europe/London").format(format);
                    ont = time.tz("America/Toronto").format(format);
                    saf = time.tz("Africa/Johannesburg").format(format);
                    break;
                case 'sa':
                    time = moment.tz(date_sa + args[1], "Africa/Johannesburg");
                    eng = time.tz("Europe/London").format(format);
                    ont = time.tz("America/Toronto").format(format);
                    saf = time.tz("Africa/Johannesburg").format(format);
                    break;
                default:
                    return message.channel.send("Invalid TZ Code. Valid Codes: en, on, sa")
            }
            return message.channel.send("```YAML" +
                `\nTime at ${args[1]}\n`
                + `\nEngland: ${eng}`
                + `\nOntario: ${ont}`
                + `\nAfrica: ${saf}`
                + "```");
        }

        if (args.length && !parse) {
            uk_raw.add(parseInt(args[0]), 'hour');
            ontario_raw.add(parseInt(args[0]), 'hour');
            south_africa_raw.add(parseInt(args[0]), 'hour');
        } if (args.length > 1 && !parse) {
            uk_raw.add(parseInt(args[1]), 'minute');
            ontario_raw.add(parseInt(args[1]), 'minute');
            south_africa_raw.add(parseInt(args[1]), 'minute');
        } if (args.length > 2 && !parse) {
            uk_raw.add(parseInt(args[2]), 'second');
            ontario_raw.add(parseInt(args[2]), 'second');
            south_africa_raw.add(parseInt(args[2]), 'second');
        }

        let uk = uk_raw.format(format);
        let ontario = ontario_raw.format(format);
        let south_africa = south_africa_raw.format(format);

        let msg = "```YAML\n"
            + `England: ${uk}\n`
            + `Ontario: ${ontario}\n`
            + `Africa: ${south_africa}\n`
            + "```";
        return message.channel.send(msg);
    },
};