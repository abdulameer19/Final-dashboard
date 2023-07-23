import express from "express";
import dbConnection from "./dbConnector";
import bodyParser from "body-parser";
import cors from "cors";
import fakeFill from "./routes/fakeFill";
import dotenv from "dotenv";
import apiRoutes from "./routes";
import { ApolloServer } from "apollo-server-express";
import schema from "./graphql/schema";

const app = express();
const port = 5000;
dotenv.config();

async function startServer() {
  try {
    await dbConnection();
    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.json({ limit: "50mb" })); // Increase the limit to allow larger payloads
    app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    app.use("/", apiRoutes);
    app.use("/api/faker", fakeFill);

    const server = new ApolloServer({
      schema,
      context: ({ req }) => ({ req }),
      introspection: true,
    });

    await server.start();
    server.applyMiddleware({ app });

    app.listen(port, () =>
      console.log(`Running on port ${port}, GraphQL endpoint: /graphql`)
    );
  } catch (err) {
    console.error("Error starting server:", err);
  }
}

startServer();
