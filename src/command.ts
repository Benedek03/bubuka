import { CommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody as DataType } from 'discord.js';

export type Command = {
    data: DataType;
    execute: (interaction: CommandInteraction) => Promise<void>;
}

export const commandMap: Map<string, Command> = new Map<string, Command>();
export const commandDataArray: DataType[] = [];

for (const f of [
    './cmds/insult.js',
    './cmds/ping.js'
]) {
    let c = await import(f);
    commandMap.set(c.default.data.name, c.default);
    commandDataArray.push(c.default.data);
}