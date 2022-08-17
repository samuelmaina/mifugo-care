# Vet Health 
 it is  a web based system that connect livestock farmer to vet services. Backend done in TDD
## Home page
![](Data/screenshots/Screenshot%202021-07-26%20120302.png "The overall Home page of the application")

## Client Home Page
![](Data/screenshots/Screenshot%202021-07-26%20120419.png "The client home page")

## Validation in the sign-up and login page
![Error_handling](https://user-images.githubusercontent.com/55924723/185060404-5f3c768a-42b5-4748-822b-747071489a77.png)

## Validation in the user Request form
![validation_of_the_user_input](https://user-images.githubusercontent.com/55924723/185060671-59133ed9-958f-42e3-9805-fa2bfa2a4d01.png)

## Automative client location or manual picking picking after request form submission
![automatic_location_pic_or_manual](https://user-images.githubusercontent.com/55924723/185060925-f65d3d2c-6717-4070-a103-ef09ff4bd491.png)

## Client being shown the status of different jobs posted when clicking the request timeline
![showing_job_client_request](https://user-images.githubusercontent.com/55924723/185061803-15f2f18d-e1fd-44ae-9931-de150f70f02f.png)


## Validation in the vet detail creation of updation form. By default show a map to the client location in the buttom.
![input_validation](https://user-images.githubusercontent.com/55924723/185062200-efbb50f2-93d0-468d-90db-7e68fb7e080a.png)

## Vet being prompted to accept the system assigned task
![system_assigned_task](https://user-images.githubusercontent.com/55924723/185062535-f32fee67-95a1-46a0-afc7-0f3c13a0d9db.png)
### Can view the submitted images
![view_the_animal_pictures](https://user-images.githubusercontent.com/55924723/185063157-226db48e-8fd1-4670-a47a-51a089f007f9.png)


## Vet jobPull of the accepted jobs.
![vet_can_view_map](https://user-images.githubusercontent.com/55924723/185063610-a27e84ee-7032-4bc1-9330-00021bb3081c.png)

## Other  application specifications can be view in the tests folder in the repo.

# How to Run and start the backend / server
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
