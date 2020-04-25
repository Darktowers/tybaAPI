
# Express TypeScript Boilerplate 
#### 1. Install Docker and mongoDB
#### 2. Install dependencies
```
$ npm i
$ npm i -g ts-node
```
## Development
### Start dev server
Starting the dev server also starts MongoDB as a service in a docker container using the compose script at `docker-compose.dev.yml`.
```
$ npm run dev
```
If windows 
```
$ npm run devWin
```

Running the above commands results in 
* 🌏**API Server** running at `http://localhost:3000`
* 🛢️**MongoDB** running at `mongodb://localhost:27017`

## Packaging and Deployment
#### 1. Run with docker-compose

```
$ docker-compose up
```

#### 2. Run with docker

```
$ docker build -t api-server .
$ docker run -t -i -p 3000:3000 api-server
```

#### 3. Build and run

```
$ npm run build && npm run start
```

---


