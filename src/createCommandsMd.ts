import { writeFileSync } from "fs";
import { commandDataArray } from "./command.js";


let text = "# **Commands:**\n";
for (let i = 0; i < commandDataArray.length; i++) {
    const c = commandDataArray[i];
    text += `## **${c.name}**\n`;
    text += `### ${c.description}\n`;
    if (c.options && c.options.length > 0) {
        text += '### options:\n';
        for (let j = 0; j < c.options.length; j++) {
            const o = c.options[j];
            if (o.required == false)
                text += `- *${o.name}*: ${o.description}\n`;
            else
                text += `- ${o.name}: ${o.description}\n`;
        }
    }
}

writeFileSync('./commands.md', text);
