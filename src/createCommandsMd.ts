import { writeFileSync } from "fs";
import { md, commandDataArray } from "./command.js";

writeFileSync('./commands.md', md);
