module.exports.config = {
    name: "cmd",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    description: "Manage/Full control of the bot's module",
    commandCategory: "Admin-bot system",
    usages: "[load/unload/loadAll/unloadAll/info] [module name]",
    cooldowns: 5,
    dependencies: {
        "fs-extra": "",
        "child_process": "",
        "path": ""
    }
};

const loadCommand = function ({ moduleList, threadID, messageID }) {

    const { execSync } = global.nodemodule['child_process'];
    const { writeFileSync, unlinkSync, readFileSync } = global.nodemodule['fs-extra'];
    const { join } = global.nodemodule['path'];
    const { configPath, mainPath, api } = global.client;
    const logger = require(mainPath + '/utils/log');

    var errorList = [];
    delete require['resolve'][require['resolve'](configPath)];
    var configValue = require(configPath);
    writeFileSync(configPath + '.temp', JSON.stringify(configValue, null, 2), 'utf8');
    for (const nameModule of moduleList) {
        try {
            const dirModule = __dirname + '/' + nameModule + '.js';
            delete require['cache'][require['resolve'](dirModule)];
            const command = require(dirModule);
            global.client.commands.delete(nameModule);
            if (!command.config || !command.run || !command.config.commandCategory) 
                throw new Error('Module is malformed!');
            global.client['eventRegistered'] = global.client['eventRegistered']['filter'](info => info != command.config.name);
            if (command.config.dependencies && typeof command.config.dependencies == 'object') {
                const listPackage = JSON.parse(readFileSync('./package.json')).dependencies,
                    listbuiltinModules = require('module')['builtinModules'];
                for (const packageName in command.config.dependencies) {
                    var tryLoadCount = 0,
                        loadSuccess = ![],
                        error;
                    const moduleDir = join(global.client.mainPath, 'nodemodules', 'node_modules', packageName);
                    try {
                        if (listPackage.hasOwnProperty(packageName) || listbuiltinModules.includes(packageName)) global.nodemodule[packageName] = require(packageName);
                        else global.nodemodule[packageName] = require(moduleDir);
                    } catch {
                        logger.loader('Packages not found ' + packageName + ' support for command ' + command.config.name+ 'install it...', 'warn');
                        const insPack = {};
                        insPack.stdio = 'inherit';
                        insPack.env = process.env ;
                        insPack.shell = !![];
                        insPack.cwd = join(global.client.mainPath,'nodemodules')
                        execSync('npm --package-lock false --save install ' + packageName + (command.config.dependencies[packageName] == '*' || command.config.dependencies[packageName] == '' ? '' : '@' + command.config.dependencies[packageName]), insPack);
                        for (tryLoadCount = 1; tryLoadCount <= 3; tryLoadCount++) {
                            require['cache'] = {};
                            try {
                                if (listPackage.hasOwnProperty(packageName) || listbuiltinModules.includes(packageName)) global.nodemodule[packageName] = require(packageName);
                                else global.nodemodule[packageName] = require(moduleDir);
                                loadSuccess = !![];
                                break;
                            } catch (erorr) {
                                error = erorr;
                            }
                            if (loadSuccess || !error) break;
                        }
                        if (!loadSuccess || error) throw 'Unable to load package ' + packageName + (' give command ') + command.config.name +', error: ' + error + ' ' + error['stack'];
                    }
                }
                logger.loader(' Successfully downloaded the entire package for the command ' + command.config.name);
            }
            if (command.config.envConfig && typeof command.config.envConfig == 'Object') try {
                for (const [key, value] of Object['entries'](command.config.envConfig)) {
                    if (typeof global.configModule[command.config.name] == undefined) 
                        global.configModule[command.config.name] = {};
                    if (typeof configValue[command.config.name] == undefined) 
                        configValue[command.config.name] = {};
                    if (typeof configValue[command.config.name][key] !== undefined) 
                        global.configModule[command.config.name][key] = configValue[command.config.name][key];
                    else global.configModule[command.config.name][key] = value || '';
                    if (typeof configValue[command.config.name][key] == undefined) 
                        configValue[command.config.name][key] = value || '';
                }
                logger.loader('Loaded config' + ' ' + command.config.name);
            } catch (error) {
                throw new Error('» Unable to load config module, error: ' + JSON.stringify(error));
            }
            if (command['onLoad']) try {
                const onLoads = {};
                onLoads['configValue'] = configValue;
                command['onLoad'](onLoads);
            } catch (error) {
                throw new Error('» Unable to onLoad module, error: ' + JSON.stringify(error), 'error');
            }
            if (command.handleEvent) global.client.eventRegistered.push(command.config.name);
            (global.config.commandDisabled.includes(nameModule + '.js') || configValue.commandDisabled.includes(nameModule + '.js')) 
            && (configValue.commandDisabled.splice(configValue.commandDisabled.indexOf(nameModule + '.js'), 1),
            global.config.commandDisabled.splice(global.config.commandDisabled.indexOf(nameModule + '.js'), 1))
            global.client.commands.set(command.config.name, command)
            logger.loader('Loaded command ' + command.config.name + '!');
        } catch (error) {
            errorList.push('- ' + nameModule + ' reason:' + error + ' at ' + error['stack']);
        };
    }
    if (errorList.length != 0) api.sendMessage('» Commands that went wrong while loading: ' + errorList.join(' '), threadID, messageID);
    api.sendMessage('» Downloaded successfully ' + (moduleList.length - errorList.length) + ' command(s)', threadID, messageID) 
    writeFileSync(configPath, JSON.stringify(configValue, null, 4), 'utf8')
    unlinkSync(configPath + '.temp');
    return;
}

const unloadModule = function ({ moduleList, threadID, messageID }) {
    const { writeFileSync, unlinkSync } = global.nodemodule["fs-extra"];
    const { configPath, mainPath, api } = global.client;
    const logger = require(mainPath + "/utils/log").loader;

    delete require.cache[require.resolve(configPath)];
    var configValue = require(configPath);
    writeFileSync(configPath + ".temp", JSON.stringify(configValue, null, 4), 'utf8');

    for (const nameModule of moduleList) {
        global.client.commands.delete(nameModule);
        global.client.eventRegistered = global.client.eventRegistered.filter(item => item !== nameModule);
        configValue["commandDisabled"].push(`${nameModule}.js`);
        global.config["commandDisabled"].push(`${nameModule}.js`);
        logger(`Unloaded command ${nameModule}!`);
    }

    writeFileSync(configPath, JSON.stringify(configValue, null, 4), 'utf8');
    unlinkSync(configPath + ".temp");

    return api.sendMessage(`» Canceled successfully ${moduleList.length} command(s)`, threadID, messageID);
}

module.exports.run = function ({ event, args, api }) {
    
    const { readdirSync } = global.nodemodule["fs-extra"];
    const { threadID, messageID } = event;
  
const permission = global.config.GOD;
  	if (!permission.includes(event.senderID)) return api.sendMessage(`⚠️You don't have permission to use this command!`, event.threadID, event.messageID);
    var moduleList = args.splice(1, args.length);
    switch (args[0]) {
      case "count": {
      let commands = client.commands.values();
		  let infoCommand = "";
			api.sendMessage("» Currently available " + client.commands.size + " command can use!"+ infoCommand, event.threadID, event.messageID);
      break;
		}
        case "load": {
            if (moduleList.length == 0) return api.sendMessage("» Module name cannot be empty!", threadID, messageID);
            else return loadCommand({ moduleList, threadID, messageID });
        }
        case "unload": {
            if (moduleList.length == 0) return api.sendMessage("» Module name cannot be empty!", threadID, messageID);
            else return unloadModule({ moduleList, threadID,   messageID });
        }
        case "loadAll": {
            moduleList = readdirSync(__dirname).filter((file) => file.endsWith(".js") && !file.includes('example'));
            moduleList = moduleList.map(item => item.replace(/\.js/g, ""));
            return loadCommand({ moduleList, threadID, messageID });
        }
        case "unloadAll": {
            moduleList = readdirSync(__dirname).filter((file) => file.endsWith(".js") && !file.includes('example') && !file.includes("command"));
            moduleList = moduleList.map(item => item.replace(/\.js/g, ""));
            return unloadModule({ moduleList, threadID, messageID });
        }
        case "info": {
            const command = global.client.commands.get(moduleList.join("") || "");

            if (!command) return api.sendMessage("» The module you entered does not exist!", threadID, messageID);

            const { name, version, hasPermssion, credits, cooldowns, dependencies } = command.config;

            return api.sendMessage(
                "=== " + name.toUpperCase() + " ===\n" +
                "- Coded by: " + credits + "\n" +
                "- Version: " + version + "\n" +
                "- Permission Request: " + ((hasPermssion == 0) ? "User" : (hasPermssion == 1) ? "Administrators" : "bot operator" ) + "\n" +
                "- Waiting time: " + cooldowns + " second(s)\n" +
                `- Packages required: ${(Object.keys(dependencies || {})).join(", ") || "Not available"}`,
                threadID, messageID
            );
        }
        default: {
            return global.utils.throwError(this.config.name, threadID, messageID);
        }
    }
}
