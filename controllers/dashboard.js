'use strict';

import logger from "../utils/logger.js";
import legoStore from '../models/lego-store.js';
import { v4 as uuidv4 } from 'uuid';
import accounts from './accounts.js';



const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");

    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      const searchTerm = request.query.searchTerm || "";

      const collections = searchTerm
        ? legoStore.searchUserCollections(searchTerm, loggedInUser.id)
        : legoStore.getUserCollections(loggedInUser.id);

      const sortField = request.query.sort;
      const order = request.query.order === "desc" ? -1 : 1;

      let sorted = collections;

      if (sortField) {
        sorted = collections.slice().sort((a, b) => {
          if (sortField === "title") {
            return a.title.localeCompare(b.title) * order;
          };

          return 0
        });
      };

      const viewData = {
        title: "Lego Collection Dashboard",
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
        legoCollections: sortField ? sorted : collections,
        search: searchTerm,
        titleSelected: request.query.sort === "title",
        ascSelected: request.query.order === "asc",
        descSelected: request.query.order === "desc",
      };

      logger.info('about to render' + viewData.legoCollections);

      response.render('dashboard', viewData);
    } 
    else response.redirect('/');
    
    // const viewData = {
    //   title: "Lego Collection Dashboard",
    //   legoCollections: legoStore.getAllLego() //retrieve all the collections in JSON file
    // };

    //logger.debug(viewData.legoCollections);
    
    // response.render('dashboard', viewData);
  },

  addCollection(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug(loggedInUser.id);
    const timestamp = new Date();

    const newCollection = {
      userid: loggedInUser.id,
      id: uuidv4(),
      title: request.body.title,
      date: timestamp,
      sets: [],
      image: ""
    };
    legoStore.addCollection(newCollection);
    response.redirect('/dashboard');
  },

  deleteCollection(request, response) {
    const collectionId = request.params.id;
    logger.debug(`Deleting Playlist ${collectionId}`);
    legoStore.removeCollection(collectionId);
    response.redirect("/dashboard");
  },


};

export default dashboard;

