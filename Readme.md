
Overview:
This repository contains code for a backend application built using Node.js, GraphQL, and MongoDB. The backend application is responsible for handling sales data and provides a GraphQL API to fetch and manage the sales data.

Prerequisites:
Before running the application, make sure you have the following installed on your system:
1. Node.js and npm: You can download and install Node.js from the official website: https://nodejs.org/en/download/
2. MongoDB: Install MongoDB on your system, or you can use an online MongoDB service like MongoDB Atlas: https://www.mongodb.com/cloud/atlas

Setup Instructions:
1. Clone the Repository:
   Clone this repository to your local machine using the following command:
   git clone <repository-url>

2. Install Dependencies:
   Navigate to the backend folder and install the required dependencies using npm:
   cd backend
   npm install

3. Configure Environment Variables:
   Create a .env file in the backend folder and set the following environment variables:
   - MONGO_URI: The MongoDB connection URI. If using MongoDB Atlas, you can get the connection string from your MongoDB Atlas dashboard.

4. Start the Server:
   To start the backend server, run the following command:
   npm start

5. Testing:
   To run the tests, use the following command:
   npm test

6. Dockerize the Backend (Optional):
   If you want to Dockerize the backend application, you need to have Docker installed on your system. Then, create a Dockerfile in the backend folder with the necessary configurations to build the Docker image. After creating the Dockerfile, you can build and run the Docker container to deploy the backend.

Folder Structure:
- backend:
  - src: Contains the source code for the backend application.
    - salesDataModel.ts: Defines the MongoDB schema and model for the sales data.
    - resolvers.ts: Contains the GraphQL resolvers for handling queries and mutations.
    - typeDefs.ts: Defines the GraphQL schema using the gql tag.
    - index.ts: The entry point for the backend application, where the Apollo Server is set up.
  - dataGenerationScript.ts: A script to generate test sales data and insert it into the database.
  - jest.config.ts: Configuration for Jest testing framework.
  - tsconfig.json: TypeScript configuration file.
  - package.json: Contains project dependencies and scripts.

Note:
- Make sure to replace <repository-url> in step 1 with the actual URL of the Git repository if you are using version control.
- Don't forget to update the .env file with the appropriate MongoDB connection URI before starting the server.

Enjoy using the backend application!