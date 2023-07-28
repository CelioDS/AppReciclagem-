import express from "express";

import {
  deleteDB,
  getDB,
  setDB,
  updateDB,
} from "../controllers/controllers.js";

const router = express.Router();

router.get("/", getDB);

router.post("/", setDB);

router.put("/", updateDB);

router.delete("/", deleteDB);

export default router;
