# Botstion 5 Plugin Documentation

## Example plugin

```js
const bot = require("../boat") // Replace with path to botstion if required
bot.registerPlugin(new bot.Plugin({
    // Plugin metadata
    name: "My first plugin",
    author: "You",
    version: "v1.0",
    description: "This is a Botstion 5 plugin",
  
    onload: function() { // When the plugin is loaded, that means you shoulds setup any callbacks, and register commands.
         console.log("Your plugin has been loaded by Botstion")
         plugin.on("clientReady", function() { // If you require code to be ran when the bot initializes, put it in here.
             console.log("The client is connected to Discord.")
         })
         bot.client.on("message", function(m) { // When someone sends a message in any server, log it to console.
             console.log(m.content)
         })
        
        // Register a command
        plugin.registerCommand("test","My first command","",function(client,message,arguments) {
            m.reply("Hello!")
        })
    },
  
    onunload: function() { // When the plugin is unloaded, it will no longer recieve plugin events or commands, and you should remove  any other callbacks or event handlers.
        console.log("Your plugin has been unloaded by Botstion.")
    }
}))
```

When using the default plugin loader, you should place the plugin in the "plugins" folder. Nested folders are allowed.

## Botstion class

Requiring the `boat.js` file returns a Botstion class.

## Functions

| Function Name                                    | Return Value | Description                                                  |
| ------------------------------------------------ | ------------ | ------------------------------------------------------------ |
| **registerPlugin**(`Plugin` plugin)              | `string`     | Loads a plugin into Botstion. Return value is the plugin ID used for unloading the plugin if required. |
| **deregisterPlugin**(`string` pluginId)          |              | Unloads a plugin, argument is the plugin ID returned by registerPlugin |
| **emit**(`string` eventName, `Any[]` arguments ) |              | Calls `EventEmitter.emit` on all plugins.                    |

## Properties

| Property Name | Property Type       | Description                                     |
| ------------- | ------------------- | ----------------------------------------------- |
| **plugins**   | `Array` of `Plugin` | A list of all the plugins loaded into Botstion. |
| **client**    | `Discordjs.Client`  | The bot's client.                               |
| **isReady**   | `Boolean`           | Set to `true` when the client becomes ready     |
| **Plugin**    | `Class`             | A class to create plugins                       |

# Plugin class

**Extends** EventEmitter

## Constructor

| Arguments     | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| `object` args | Takes an object, which needs the keys `string` name, `string` author, `string` version, `string` description, `function` |

## Functions

| Function Name                                                | Return Value | Description         |
| ------------------------------------------------------------ | ------------ | ------------------- |
| **registerCommand**(`string` name, `string` description, `string` usage, `function(client,message,argument)` fn) |              | Registers a command |

## Properties

| Property Name | Type                | Description                                 |
| ------------- | ------------------- | ------------------------------------------- |
| **commands**  | `Array` of `Object` | List of commands registered by this plugin. |