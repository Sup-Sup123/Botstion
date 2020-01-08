const fs = require("fs")
const path =require("path")
const botstion = require("./boat")

function scanFolder(folder) {
	var a = []
	var level = fs.readdirSync(folder)
	for (var file of level) {
		var j = path.join(folder, file)
		if (file.endsWith(".js") && !file.startsWith(".")) {
			a.push(j)
		}
		if (fs.statSync(j).isDirectory()) {
			a = a.concat(scanFolder(j))
		}
	}
	return a

}
console.log("Scanning for plugins...")
var plugins = scanFolder("./plugins")
console.log("Found",plugins.length,"plugins!")
for (var plugin of plugins) {
    console.log("Loading " + plugin)
    require(path.resolve(plugin))
}