import { Client, Events, GatewayIntentBits } from "discord.js";
import { commandListener, deployCommands } from "./command.js";
import { buttonListener } from "./button.js";
import { applicationId, testGuildId, token } from "./config.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on(Events.InteractionCreate, commandListener);
client.on(Events.InteractionCreate, buttonListener);

client.once(Events.ClientReady, async (client) => {
    console.log(`Ready! Logged in as ${client.user.tag}`);
});

await deployCommands(token, applicationId, testGuildId)
client.login(token);