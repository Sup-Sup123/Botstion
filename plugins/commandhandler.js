var allCommands = [];
var allPlugins = [];
const config = require("../configLoader");
const Discord = require("discord.js");

function handleError(e,msg) {
	var stack = (e.stack || e.toString())
	if (stack.length > 1950) {
		stack = stack.substr(0,1950)
	}
	var emb = new Discord.MessageEmbed()
	.setAuthor("Oops. I had a unhandled error.", "https://cdn.discordapp.com/attachments/423185454582464512/425761155940745239/emote.png")
	.setColor("#ff3860")
	.setDescription("<@" + msg.author.id +">```" + stack + '```')
	try {
		msg.client.channels.resolve(config.errorReportChannel).send({ embed: new Discord.MessageEmbed()
			.setAuthor("Oops. I had a unhandled error.", "https://cdn.discordapp.com/attachments/423185454582464512/425761155940745239/emote.png")
			.setColor("#ff3860")
			.setDescription('```' + stack + '```')
			.setFooter(msg.content) });
		emb.setFooter("This server has been reported to the Botstion development team, and we may message you if we see fit.") 
	}catch(e){log.error(e)}
	return msg.reply({ embed: emb });
}

function noop(){}

async function invokeCommand(command,msg,suffix,cmd) {
	if (msg.guild) {
		log(`${msg.author.username} invoked ${cmd} in ${msg.channel.guild.name} with arguments ${suffix.join(" ")}`);
	} else {
		log(`${msg.author.username} invoked ${cmd} with arguments ${suffix.join(" ")}`);
	}
	try {
		var rtrn = command.execute(msg.client, msg, suffix)
		if (rtrn.catch) {
			rtrn.catch(function(e) {
				handleError(e,msg)
			})
		}
		rtrn = await rtrn
		if (rtrn && typeof rtrn.react != "undefined") {
			try {
				rtrn.react("🗑️").then(noop).catch(noop);
				const filter = (reaction, user) => {
					if (reaction.emoji.name === '🗑️' &&
						!user.bot &&
						(user.id == msg.author.id ||
							(!rtrn.guild ||
							 rtrn.guild.members.get(user.id).hasPermission("MANAGE_MESSAGES")))) {
							rtrn.edit({content: `(message was deleted by ${user.username})`,embed: null}).then(noop).catch(noop)
							rtrn.reactions.removeAll().then(noop).catch(noop)
						}
				}
				rtrn.awaitReactions(filter, { time: 15000 })
					.then(collected => {})
					.catch(noop);
			} catch(e) {
				
			}
		} else {
			log.warn(`Command ${cmd} didn't return a Message object with arguments .`)
		}
	} catch(e) {
		handleError(e,msg)
	}
}

module.exports = {
	name: "Ganymede",
	author: "theLMGN",
	version: 3,
	description: "Botstion's commandhandler.",
	commands: [
		{
			name: "help",
			usage: "",
			description: "Lists commands and their descriptions/examples",
			execute: async(c, m, a) => {
				var emb = new Discord.MessageEmbed()
					.setTitle(`There are ${allCommands.length} available for you to use`)
					.setColor("#3273dc")
				var fields = 0;
				for (i in  allCommands) {
					var command = allCommands[i];
					if (fields > 24) {
						try {m.author.send(emb);}catch(e){}
						fields = 0
						emb = new Discord.MessageEmbed()
									.setTitle(`There are ${allCommands.length} commands available for you to use`)
									.setColor("#3273dc")
					}
					emb.addField(`${config.defaultPrefix}${command.name} ${command.usage}`, command.description, false);
				}
				try {
					m.author.send(emb);
					try {
						await m.react('📬')
					} catch(e) {
						await m.reply("📬 - Check your DMs!")
					}
				} catch(e) {
					await m.reply(`:mailbox: - Couldn't DM you.\n\`\`\`${e.toString()}\`\`\``)
				}

			},
		}
	],
	events: [{
		name: "message",
		exec: async msg => {
			var prefix = config.defaultPrefix; // todo: mongo prefix
											   // LUL
			if (msg.author.bot) return null;
			if (!msg.content.startsWith(prefix)) return null;
			const cmd = msg.content.split(" ")[0].trim().toLowerCase().replace(prefix, "");
			const suffix = msg.content.split(" ").splice(1);
			for (var command of allCommands) {
				if (cmd == command.name) {
					invokeCommand(command,msg,suffix,cmd)
					return true;
				}
				for (var alias of command.aliases || []) {
					if (alias == cmd) {
						await invokeCommand(command,msg,suffix,cmd)
												return true;
					}
				}
			}
		},
	}],
	init: async plugins => {
		for (var plugin of plugins) {
			allPlugins.push(plugin);
			if (plugin.commands) {
				for (var command of plugin.commands) {
					allCommands.push(command);
				}
			}
		}
	},
	addons: {allCommands}
};
