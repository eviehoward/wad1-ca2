'use strict';

import express from 'express';
import logger from "./utils/logger.js";

const router = express.Router();

import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import legoCollection from './controllers/legoCollection.js';
import about from './controllers/about.js';

router.get('/', start.createView);
router.get('/dashboard', dashboard.createView);
router.get('/legoCollection/:id', legoCollection.createView);
router.get('/about', about.createView);
router.get('/legoCollection/:id/deleteset/:setid', legoCollection.deleteSet);
router.get('/dashboard/deletecollection/:id', dashboard.deleteCollection);



router.post('/legoCollection/:id/addSet', legoCollection.addSet);
router.post('/dashboard/addCollection', dashboard.addCollection);



export default router;
