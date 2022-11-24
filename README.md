# bubuka
Bubuka is a discord bot i create for fun.

# Development
I develop this bot alone so these are notes for myself.<br>
A few things to keep in mind:
- only commit to the develop branch and merge on github
- merge develop into main on github
- the github action will:<br>
    create commands.md,<br>
    build and push a new docker image tho DockerHub
## Setup 
```
git clone https://github.com/Benedek03/bubuka.git
cd bubuka
npm i
```
## npm scripts
### Build and start the bot 
```
npm run build
npm run start
```
### Start the bot using nodemon and ts-node
```
npm run dev
```
### Start the bot using ts-node
```
npm run ts-start
```
### Create commands.md
```
npm run create-commands.md
```
### Deploy the commands
```
npm run deploy-commands <token> <application id> <test guild id>
```
or
```
source .env 
npm run deploy-commands $TOKEN $APPLICATIONID $GUILDID
```
### Delete the commands
```
npm run delete-commands <token> <application id> <test guild id>
```
or
```
source .env 
npm run delete-commands $TOKEN $APPLICATIONID $GUILDID
```

# Running the bot in a Docker container
## Getting the image
### Pulling from Docker Hub
```
docker pull benedek03/bubuka
```

### Building image locally
You can build the image like this:
```
git clone https://github.com/Benedek03/bubuka.git
cd bubuka
docker build . -t benedek03/bubuka
```

## Running a container
### With a .env file
```
docker run -d --env-file .env --name bubuka benedek03/bubuka
```
The .env file must contain these variables:
```
TOKEN=
APPLICATIONID=
```
### Without a .env file
```
docker run -d \
    -e TOKEN= \
    -e APPLICAIONID=  \
    --name csengo benedek03/csengo
```
