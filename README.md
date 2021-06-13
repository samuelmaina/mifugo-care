# Vet Health web based system

## How to Run and start the backend / server

1. install [node js](https://nodejs.dev/) in the client development machine and ensure npm is installed by the command

   ### `npm -v`

   to check npm version

2. install [mongoDb](https://www.mongodb.com/)

3. install node_modules / dependencies as specified in the package.json at `311-project` this is done by the command
   ### `npm install --save`
4. At the Project root folder `311_project` after installing the modules run the command
   ### `node index.js`
5. The above command runs and starts the server at
   ### `port 3100`

## How to Run and start the client build, running the build does not require any additional dependencies except a server to serve the build This is achieved in the following 3 steps.

1. run the command below to install client server globally
   ### `npm install -g serve`
2. Run the command below at the client root folder `client`
   to start the client server.
   ### `serve -s build`
3. The last command shown above will serve static site on the port 5000.
   open [http://localhost:3000](http://localhost:3000) to view in the browser

   Like many of serve’s internal settings, the port can be adjusted using the -l or --listen flags:

   ### `serve -s build -l 4000`

   open [http://localhost:4000](http://localhost:4000) to view in the browser

## How to Run and start the client in development mode

1. The client has been bootstraped with
   ### `npx create-react-app`
2. additional dependencies can be found at `client/package.json file`
