const Discord = require("discord.js");


function seed(str) {
    for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
        h = h << 13 | h >>> 19;
    return function() {
        h = Math.imul(h ^ h >>> 16, 2246822507);
        h = Math.imul(h ^ h >>> 13, 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}

const overrides = {
    '158311402677731328': "NaN", // me
    '101588913746890752': "40", // fishy
    '195252536389664768': "50", // jaffa
    '262989909411758080': "99.9" // archie
}

module.exports = {
	name: "Gaydar™",
	author: "theLMGN",
	version: 1,
	description: "Implements Gaydar™ technology",
	commands: [{
		name: "gay",
		usage: "<@321746347550310411>",
        description: "Uses Gaydar™ on a specific user",
         /**
         * @param {Discord.Client} c Client
         * @param {Discord.Message} m Invoking message
         * @param {Array} a Arguments
         */
		execute: async(c, m, a) => {
			if (m.mentions.users.size < 1) {
                return m.reply({ embed: new Discord.MessageEmbed()
                    .setAuthor("You haven't specified a user.", "https://cdn.discordapp.com/attachments/423185454582464512/425761155940745239/emote.png")
                    .setColor("#ff3860")
                    .setFooter(`Thin air doesn't really get detected by Gaydar™`) });
            }
            var member = m.mentions.users.first()
            if (member.bot) {
                return m.reply({ embed: new Discord.MessageEmbed()
                    .setAuthor("That's a bot.", "https://cdn.discordapp.com/attachments/423185454582464512/425761155940745239/emote.png")
                    .setColor("#ff3860")
                    .setFooter(`I don't think robots can have sexualities.`) });
            }
            if (overrides[member.id]) {
                return m.reply({ embed: new Discord.MessageEmbed()
                    .setTitle("Gaydar™")
              .setDescription(`${member.username} is ${overrides[member.id]}% gay`)
                    .setColor("#3273dc")})
            }
            var rnd = seed(member.id)
			m.reply({ embed: new Discord.MessageEmbed()
                .setTitle("Gaydar™")
          .setDescription(`${member.username} is ${Math.round(rnd() / 70000000)}% gay`)
                .setColor("#3273dc")})
		},
	}]
};
