# Task Manager
This full stack application was written with the MERN Stack.  

This application was styled using tailwinds css, as I wanted to learn a new way to style my applications. 

To run this application locally, please run the following commands after cloning the repo:  
Navigate to the backend directory and run:  
- npm install express  
- npm run start
- You will also need to create a MongoDB database to run this app, and place it in the config.js file. As it does not yet have the login features created and this app is not currently using a .env file, I remove my DB from the project.

After connecting to the DB and the server, navigate to the frontend folder and run:   
- npm install
- npm run dev

Here are some screen shots of what the app looks like...
### Landing Page
![Task-Manager(Landing page)](https://github.com/j-bloom/Task-Manager/assets/36741471/ba7e50d1-fd7f-4231-b161-302d24d3e196)

### Create Task Page
![Task-Manager(Create page)](https://github.com/j-bloom/Task-Manager/assets/36741471/92b4b104-5130-4a7c-8a4f-2052cfcbb993)

### Edit Task page
![Task-Manager(Edit page)](https://github.com/j-bloom/Task-Manager/assets/36741471/57f14599-3d82-44d3-9e0c-a1c724973f27)

### Delete Task page
![Task-Manager(Delete page)](https://github.com/j-bloom/Task-Manager/assets/36741471/41df4287-c922-4bda-bd98-dc1a2b33d143)

### Langing Page after Delete task is completed
![Task-Manager(Landing page after delete functionality)](https://github.com/j-bloom/Task-Manager/assets/36741471/b185c379-3e8c-4023-a286-4a9999724a8a)
*The Delete, Create and Edit functionality has similar toaster messages*
