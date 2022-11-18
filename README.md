# bubuka
bubuka is a discord bot i create for fun.

# Running the bot
## Getting the image
### Pulling from Docker Hub
```
docker pull benedek03/bubuka
```

### Building image locally
you can build the image like this:
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
the .env file must contain these variables:
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