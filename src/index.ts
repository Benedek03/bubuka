import { Client, Events, GatewayIntentBits, REST, Routes } from "discord.js";
import { commandDataArray, commandMap } from "./command.js";
import { buttonMap } from "./button.js";
import { config } from "dotenv"; config({path: '../.env'});

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async client => {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN as string);
    try {
        console.log(`Started refreshing application (/) commands.`);
        const data = await rest.put(
            // Routes.applicationGuildCommands(process.env.CLIENTID as string, process.env.GUILDID as string),
            Routes.applicationCommands(process.env.CLIENTID as string),
            { body: commandDataArray },
        );
        console.log(`Successfully reloaded application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = commandMap.get(interaction.commandName);
    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isButton()) return;

    const command = buttonMap.get(interaction.customId);
    if (!command) {
        console.error(`No button matching ${interaction.customId} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this button!', ephemeral: true });
    }
});

client.login(process.env.TOKEN);