          **##Farmpouch-**

Restful API for FarmPouch which is a platform making it easy for anyone to invest in a farm.
**##Farmpouch Investment Platform API**

````This is a RESTful API for an farmpouch investment platform. The API allows users to create an account, invest in various investment opportunities, view their investment history, and more.

                                         **###Features**
  ```The following features are included in the Project Name:

*User authentication using passport google strategy with email verification
*User password reset
*User forgot password
*User profile management
*Investment creation, modification, and deletion
*Investment search and filtering
*User investment management
*Payment processing with Flutterwave

                                         **###Getting Started**

**###Prerequisites**

```Before you can run the API, you will need to have the following installed:

*Node.js (v14 or later)
*MySQL server
*RDS AWS

**###How to Connect AWS RDS with MySQL Workbench**

```In AWS, the database is created using RDS
If you want to configure the database using the local machine you can use MySQL workbench.

In this video we will see :
 *Creating a database on the server
 *Create an RDS instance
 *Connect RDS instance with MySQL workbench
 *Creating database in MySQL workbench

**####Requirements**

1. AWS account
2. MySQL Workbench

 It needs endpoint or host address, username, and password to connect. Do not forget to set security group otherwise it will not connect.
Amazon Relational Database Service (Amazon RDS) makes it easy to set up, operate, and scale a relational database in the cloud. It provides cost-efficient and resizable capacity while automating time-consuming administration tasks such as hardware provisioning, database setup, patching, and backups. It frees you to focus on your applications so you can give them the fast performance, high availability, security, and compatibility they need. RDS need to connect with a machine from where you want to access it.

Amazon Relational Database Service (Amazon RDS) makes it easy to set up, operate, and scale a relational database in the cloud.
It provides cost-efficient and resizable capacity while automating time-consuming administration tasks such as hardware provisioning, database setup, patching and backups.
It frees you to focus on your applications so you can give them the fast performance, high availability, security and compatibility they need.
-RDS

MySQL Workbench is a unified visual tool for database architects, developers, and DBAs.
It provides data modeling, SQL development, and comprehensive administration tools for server configuration, user administration, backup, and much more.
MySQL Workbench is available on Windows, Linux and Mac OS X.
-MySQL


**###Installing**

Clone the repository to your local machine.

```In the root directory, create a .env file and add the
following environment variables:

1. Clone the repository to your local machine.
2. Install the required dependencies with `**npm install**`
3. In the root directory, create a `**.env**` file based on the `**.env.example**` file, and update the values as needed with the following variables

DB_HOST=localhost
DB_USER=<your MySQL username>
DB_PASSWORD=<your MySQL password>
DB_NAME=investments
JWT_SECRET=<your JWT secret>
FLUTTERWAVE_PUBLIC_KEY=<your Flutterwave public key>
FLUTTERWAVE_SECRET_KEY=<your Flutterwave secret key>

4. Run `**npm install**` to install the required packages.
5. Run `**npm run db:migrate**` to run the database migrations.
6. Start the server with `**npm start**`

**###Running**

To start the API, `**run npm start**`.

**##Testing**

To run the test suite, `**run npm test**`.

**##Endpoints**



**###Usage**

To use the application, follow these steps:

1. Open the application in a web browser
2. Sign up for a new account or log in to an existing account
3. Create a new investment or view existing investments
4. Manage your investments or make a payment with Flutterwave

**###EContributing**

```If you'd like to contribute to the Project Name, follow these steps:

1. Fork the repository using this link: [GitHub]( https://github.com/olaobey/Farmpouch-.git)
2. Create a new branch for your changes
3. Make your changes and commit them to your branch
4. Push your branch to your forked repository
5. Create a pull request to merge your changes into the main repository

**###Endpoints**

**####Authentication**

*`POST /api/v1/auth/signUp:` sign up to user account with validation
*`POST /api/v1/auth/signin:` sign in to user account with validation
*`POST /api/v1/profile/edit:` profile edit route to user account
*`GET /api/v1/profile:` Verify a user's email address
*`POST /api/v1/google:` login to user account through google strategy.
*`POST /api/v1/google-login:` authenticate the user of the at the point of login.
*`GET /api/v1/auth/verify-email:` Verify a user's email address
*`POST /api/v1/auth/forgot-password:` Send a password reset email
*`POST /api/v1/auth/reset-password:` Reset a user's password

**###Admin**

*`GET /api/v1/admin/investments:` Get a list of all investments
*`GET /api/v1/admin/investments/:id:` Get a specific investment
*`POST /api/v1/admin/investments:` Create a new investment
*`PUT /api/v1/admin/investments/:id:` Update an existing investment
*`DELETE /api/v1/admin/investments/:id:` Delete an existing investment
*`GET /api/v1/admin/users:` Get a list of all users
*`GET /api/v1/admin/users/:id:` Get a specific user
*`PUT /api/v1/admin/users/:id:` Update an existing user
*`DELETE /api/v1/admin/users/:id:` Delete an existing user

**##Investment**

*`POST /api/v1/farm_investment:` Uploading investment file using multer library and only admin can access it
*`POST /api/v1/farm_investment:` Create new investment
*`GET /api/v1/farm_investment/:id:` Get a specific investment
*`GET /api/v1/farm_investment:` Get a list of all users
*`PUT /api/v1/farm_investment/:id:` Update an existing investment
*`DELETE /api/v1/farm_investment/:id:` Delete an existing investment

**##Payment**

*`POST /api/v1/investment_payment:` Create a new payment
*`GET /api/v1/payment/callback` verify the payment

**##User_investment**

*`POST /api/v1/user_investment:` Create a new user investment
*`GET /api/v1/user_investment/getAllInvestment` Get all investments
*`GET /api/v1/user_investment/:id/ ` get a particular investment
*`PUT /api/v1/user_investment/:id` Update a specific Investment
*`DELETE /api/v1/user_investment/:id:` Delete a an existing investment

**###Built With**

*express-validator
*express-mysql-session
*flutterwave-node
*multer
*morgan
*jwks-rsa
*jsonwebtoken
*express-session
*express
*dotenv
*crypto
*cors
*cookie-parser
*connect-flash
*bcrypt
*nodemon
*Nodemailer

**###Credits**

The Project Name was created by [ Name], with contributions from [Contributor Names].

**###Authors**


**###License**

This project is licensed under the MIT License
````
