import { writeFileSync } from "fs";
import { commandDataArray } from "../command.js";

let md = `<!--- this file was automaticly generated at ${Date.now()} --->\n# Commands:\n`;

for (const cmd of commandDataArray) {
    md += `## ${cmd.name}\n`;
    md += `### ${cmd.description}\n`;
    if (cmd.options && cmd.options.length > 0) {
        md += '### options:\n';
        for (let j = 0; j < cmd.options.length; j++) {
            const o = cmd.options[j];
            if (o.required == false)
                md += `- *${o.name}*: ${o.description}\n`;
            else
                md += `- ${o.name}: ${o.description}\n`;
        }
    }
}

writeFileSync('./commands.md', md);
