import { config as dotenv } from "dotenv"; dotenv();

if (!process.env.TOKEN || !process.env.APPLICATIONID) {
    console.log('no TOKEN or APPLICATIONID in the environment');
    process.exit(1);
}

export const token = process.env.TOKEN;
export const applicationId = process.env.APPLICATIONID;
export const testGuildId = process.env.GUILDID;