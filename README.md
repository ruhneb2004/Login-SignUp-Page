# Login-SignUp-Page
This a signup and login page which is made by plain js. Some frameworks like Mongoose and Express were used
# SignUp Page 
This page inputs the username and password and creates a new user. It checks whether the user is already signed in and, if so, throws an error. All inputs are not valid, the username at max can only have 25 characters, and the same for the password but there is also a minimum limit of 8 for the password.
# Login Page 
On this page, the user who has signed up can log in and pass into the main page. The user who has already signed up can log in and it will also give the necessary errors with an alert, if a user with a certain username doesn't exist then it will show an alert saying that the user doesn't exist and if the username is correct but the password is wrong then it will alert them with the necessary message.

The username and password are not converted into jwt token in this version but they will be added.
