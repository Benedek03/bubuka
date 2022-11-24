import { Client, Events, GatewayIntentBits, REST, Routes } from "discord.js";
import { addCommandInteractionHandler, commandDataArray } from "./command.js";
import { addButtonInteractionHandler } from "./button.js";
import { config } from "dotenv"; config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async client => {
    console.log(`Ready! Logged in as ${client.user.tag}`);

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN as string);
    try {
        console.log(`Started refreshing application (/) commands.`);
        const data = await rest.put(
            process.env.GUILDID? Routes.applicationGuildCommands(process.env.APPLICATIONID as string, process.env.GUILDID as string) : Routes.applicationCommands(process.env.APPLICATIONID as string),
            { body: commandDataArray },
        );
        console.log(`Successfully reloaded application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
});

addCommandInteractionHandler(client);
addButtonInteractionHandler(client);

client.login(process.env.TOKEN);