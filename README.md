# Auth Template

## Features

- Store User Data in MongoDB. Run docker-compose.
- Login and Signup feature added
- Encrypted JWT token
- JOI Validation

## To be Added later

- Constants for Responses
- HomePage access without Token / login and Register btn in homepage

## Run Locally

- Install all Packages

```
npm install --save
```

- Make sure Docker is installed
- Run Below command in terminal

```
docker-compose -f mongodb-docker-compose.yaml up -d
```

- Run the command to up the server

```
npm run dev
```
