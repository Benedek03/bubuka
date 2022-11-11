# bubuka

## Getting the image
### Pulling from Docker Hub
```
docker pull benedek03/bubuka
```

### Building image locally
you can build the image like this:
```
docker build . -t benedek03/bubuka
```

## Running a container
to run the container you have to create a .env file first
```
TOKEN=
CLIENTID=
```
then you can then run the container (it will automaticly register the slash commands) like this:
```
docker run -d --env-file .env --name bubuka benedek03/bubuka
```