'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";

const about = {
  createView(request, response) {
    logger.info("About page loading!"); //console

    const viewData = {
      title: "About the playlist app", //top of tab
      info: appStore.getAppInfo() //retrieve info from appstore
    };
    
    response.render('about', viewData);   
  },
};

export default about;