const Discord = require("discord.js");
const fs = require("fs");

var files = 0;

function thing(folder) {
	if (fs.lstatSync(folder).isDirectory()) {
		if (!folder.includes("node_modules") && !folder.includes("config") && !folder.includes(".DS_Store") && !folder.includes(".github") && !folder.includes(".vscode") && !folder.includes(".git")) {
			var lines = 0;
			for (var folderr of fs.readdirSync(folder)) {
				lines = lines + thing(folder + "/" + folderr)
			}
			return lines
		}
	} else {
		if (folder.includes(".") && !folder.endsWith(".json")) { // remove files that have no extension
			if (folder.split(".")[folder.split(".").length - 1] == "js") {
				files = files + 1
				return fs.readFileSync(folder).toString().split("\n").length
			}
		}
	}
	return 0
}

module.exports = {
	name: "Lines of Code",
	author: "theLMGN",
	version: 1,
	description: "A command that shows all the lines of code in js files, excluding node_modules.",
	commands: [
		{
			name: "lines",
			usage: "",
			description: "A command that shows all the lines of code in js files, excluding node_modules.",
			execute: async(c, m, a) => {

				var lines = 0;
				files = 0
				for (var folder of fs.readdirSync(".")) {
					lines = lines + thing("./" + folder)
				}
				m.reply(new Discord.MessageEmbed()
				.setColor("#23d160")
				.setDescription(`:keyboard: I searched, and I found ${lines} lines of JavaScript over ${files} files (avg. ${Math.floor(lines / files)} lines per file)! (excluding those in node_modules)`));
			},
		},
	]
};
