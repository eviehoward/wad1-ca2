'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";

const start = {
  createView(request, response) {
    logger.info("Start page loading!");
    
    const viewData = {
      title: "CA1 Starter App", //top of tab
      info: appStore.getAppInfo()
    };
    
    response.render('start', viewData);   
  },
};

export default start;
