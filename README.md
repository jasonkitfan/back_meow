# Cat Shelter Backend Documentation


## Project Overview

This backend project is built using Node.js and Express.js framework, and it is integrated with Firebase for various functionalities. The project serves as a RESTful API to handle the backend operations of a web or mobile application.


## Technologies Used

* Node.js with TypeScript: 

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. TypeScript is a superset of JavaScript that adds optional static typing and other features to the language. Together, they allow developers to write strongly-typed, scalable, and maintainable code on the server-side.

* Express.js:

Express is a web application framework for Node.js that simplifies the development of web applications. It provides a robust set of features for building single-page, multi-page, and hybrid web applications.

* Firebase

Firebase is a mobile and web application development platform that provides developers with a suite of tools and services for building scalable and secure applications. It includes services like authentication, real-time database, cloud storage, and cloud functions.


## API Documentation and Features

The backend for this project is hosted on Firebase, and all endpoints are documented using Swagger. To ensure security, all endpoints except for those that can be accessed by any visitor to the web app (such as getting the cat list, donating money, and sending messages to the shelter) have been protected with middleware that validates a user's token. This helps to prevent unauthorized access to sensitive data and functionality.


#### Documentation

https://asia-east2-meow-shelter.cloudfunctions.net/app/api-docs/#/

![api-documentation](https://github.com/jasonkitfan/back_meow/assets/65491363/bd22d85e-73ca-4509-a2e5-88f2b2f54014)

#### Features

* get the cat list
* send messsage using SMTP
* add new cat data
* update existing cat data
* remove cat from list
* update user role
* credit card payment with stripe
* adopt cat
* check adoption record
* update user data
* get user data
* identify the cat breed using Zyla api

## All Packages Installed

* express
* firebase-tools
* stripe
* swagger-ui-express
* @types/swagger-ui-express
* nodemailer
* @types/nodemailer 


## API Testing with Jest

Jest, a popular testing framework for Node.js, has been used to test some of the endpoints in this project. Jest provides a simple and intuitive way to write and execute tests, making it easy to catch bugs and ensure that the application behaves as expected. Endpoints have been tested to ensure that the API returns the correct responses and handles errors gracefully. This helps to improve the overall quality and reliability of the backend.

The testing project is separated from this project. For more detail please visit: https://github.com/jasonkitfan/api_test

## Conclusion

This backend project provides a secure and scalable API for web and mobile applications. It is built using Node.js and Express.js framework, and is integrated with Firebase for various functionalities such as authentication, real-time database, cloud storage, and cloud functions. The project also includes middleware to validate user tokens and prevent unauthorized access to sensitive data and functionality. To ensure the quality and reliability of the backend, some of the endpoints have been tested using Jest, a popular testing framework for Node.js.

Overall, this project leverages modern technologies and services to provide a robust and maintainable backend for web and mobile applications. The code is modular and scalable, and follows best practices for security and performance. If you have any questions or feedback, please feel free to reach out to the project maintainers.




