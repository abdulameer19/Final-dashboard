import express, { Router } from "express";
import fakeFill from "./fakeFill";

const apiRoutes: Router = express.Router();

apiRoutes.use("/fake", fakeFill);

export default apiRoutes;
