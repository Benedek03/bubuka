import { Client, Events, GatewayIntentBits } from "discord.js";
import { addCommandInteractionHandler, deployCommands } from "./command.js";
import { addButtonInteractionHandler } from "./button.js";
import { applicationId, testGuildId, token } from "./config.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

addCommandInteractionHandler(client);
addButtonInteractionHandler(client);

client.once(Events.ClientReady, async (client) => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
});

await deployCommands(token, applicationId, testGuildId)
client.login(token);