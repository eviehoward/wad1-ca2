"use strict";

import express from "express";
import logger from "./utils/logger.js";

const router = express.Router();

import start from "./controllers/start.js";
import dashboard from "./controllers/dashboard.js";
import legoCollection from "./controllers/legoCollection.js";
import about from "./controllers/about.js";
import stats from "./controllers/stats.js";
import accounts from "./controllers/accounts.js";

router.get("/start", start.createView);
router.get("/dashboard", dashboard.createView);
router.get("/legoCollection/:id", legoCollection.createView);
router.get("/about", about.createView);
router.get("/legoCollection/:id/deleteset/:setid", legoCollection.deleteSet);
router.get("/dashboard/deletecollection/:id", dashboard.deleteCollection);
router.get("/stats", stats.createView);

router.post("/legoCollection/:id/addSet", legoCollection.addSet);
router.post("/dashboard/addCollection", dashboard.addCollection);
router.post("/legoCollection/:id/updateSet/:setId", legoCollection.updateSet);

router.get("/searchCategory", dashboard.createView);
router.get("/sortData", dashboard.createView);

router.get("/", accounts.index);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/logout", accounts.logout);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);

export default router;
