"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbConnector_1 = __importDefault(require("./dbConnector"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const fakeFill_1 = __importDefault(require("./routes/fakeFill"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = __importDefault(require("./graphql/schema"));
const app = (0, express_1.default)();
const port = 5000;
dotenv_1.default.config();
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, dbConnector_1.default)();
            app.use((0, cors_1.default)());
            app.use(express_1.default.json());
            app.use(body_parser_1.default.json({ limit: "50mb" })); // Increase the limit to allow larger payloads
            app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
            app.use("/", routes_1.default);
            app.use("/api/faker", fakeFill_1.default);
            const server = new apollo_server_express_1.ApolloServer({
                schema: schema_1.default,
                context: ({ req }) => ({ req }),
                introspection: true,
            });
            yield server.start();
            server.applyMiddleware({ app });
            app.listen(port, () => console.log(`Running on port ${port}, GraphQL endpoint: /graphql`));
        }
        catch (err) {
            console.error("Error starting server:", err);
        }
    });
}
startServer();
