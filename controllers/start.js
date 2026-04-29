'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import accounts from './accounts.js';

import legoStore from "../models/lego-store.js";
import userStore from "../models/user-store.js";

const start = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("Start page loading!");
    
    if (loggedInUser) {
      const legoCollections = legoStore.getAllLego();
      const users = userStore.getAllUsers();

      let numCollections = legoCollections.length;
      let numSets = legoCollections.reduce((total, collection) => total + collection.sets.length, 0);
      let totalUsers = users.length;
    
      const statistics = {
        displayNumCollections: numCollections,
        displayNumSets: numSets,
        displayTotalUsers: totalUsers
      }

      const viewData = {
        title: "CA1 Starter App", //top of tab
        info: appStore.getAppInfo(),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        stats: statistics
      };
    
    response.render('start', viewData);   
    }
    else response.redirect('/');
  },
};

export default start;
