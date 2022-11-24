import { deployCommands } from "../command.js";

process.argv.splice(0, 2);

if (process.argv.length < 2)
    console.log(`Usage:
    1. argumet is the token
    2. argumet is the application id
    3. argumet is the test guild id (not necessary, if not provided the commands will be deleted globally)
    
    if you are lazy and you have these in a .env file you can do this
        source .env 
        npm run delete-commands $TOKEN $APPLICATIONID $GUILDID`);
else
    deployCommands(process.argv[0], process.argv[1], process.argv[2], [])