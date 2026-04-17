'use strict';

import logger from "../utils/logger.js";
import legoStore from '../models/lego-store.js';
import { v4 as uuidv4 } from 'uuid';


const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");
    
    const viewData = {
      title: "Lego Collection Dashboard",
      legoCollections: legoStore.getAllLego() //retrieve all the collections in JSON file
    };

    //logger.debug(viewData.legoCollections);
    
    response.render('dashboard', viewData);
  },

  addCollection(request, response) {
    const newCollection = {
      id: uuidv4(),
      title: request.body.title,
      sets: [],
      image: ""
    };
    legoStore.addCollection(newCollection);
    response.redirect('/dashboard');
},

};

export default dashboard;

