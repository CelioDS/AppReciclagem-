import express from "express";

import { getDB } from "../controllers/controllers.js";

const router = express.Router();

router.get("/", getDB);


export default router