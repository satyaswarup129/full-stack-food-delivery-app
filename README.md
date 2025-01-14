This project is a Food Delivery App that allows users to sign up, log in, and manage their cart. The application includes APIs for user authentication, cart operations, and order management. It uses Node.js, Express, MongoDB, and Mongoose to build the backend services.
Features
User Authentication (Sign Up, Login, Logout)
Cart Management (Add to Cart, Remove from Cart, Increment/Decrement Quantity)
Food Management (Display available food items)
Clear Cart Functionality
Prerequisites
Before starting, ensure you have the following installed on your machine:
Node.js (v16 or higher)
MongoDB
Postman for API testing
Installation Steps:--
Clone the Repository:
git clone <repository_url>
cd <repository_name>
Install Dependencies:
npm install
Setup Environment Variables: Create a .env file in the root directory with the following content:
makefile
PORT=8080
MONGO_URI=<Your MongoDB connection string>
JWT_SECRET=<Your secret key>
Start MongoDB: Make sure MongoDB is running on your system. Use the following command to start MongoDB locally:
mongod
Run the Application: Start the server using:
node app.js(backend)
npm start(frontend)
The server will run on http://localhost:8080.
