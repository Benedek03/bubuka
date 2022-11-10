import { CommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody as DataType } from 'discord.js';

export type Command = {
    data: DataType;
    execute: (interaction: CommandInteraction) => Promise<void>;
}

export const commandMap: Map<string, Command> = new Map<string, Command>();
export const commandDataArray: DataType[] = [];

for (const f of [
    './cmds/ping.js',
    './cmds/insult.js'
]) {
    import(f).then(c => {
        commandMap.set(c.default.data.name, c.default);
        commandDataArray.push(c.default.data);
    })
}