import { writeFileSync } from "fs";
import { md } from "../command.js";

writeFileSync('./commands.md', md);
