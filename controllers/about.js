"use strict";

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import accounts from "./accounts.js";

const about = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("About page loading!"); //console

    if (loggedInUser) {
      const viewData = {
        title: "About the playlist app", //top of tab
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
        picture: loggedInUser.picture,
        info: appStore.getAppInfo() //retrieve info from appstore
      };
      response.render("about", viewData);
    } else response.redirect("/");
  }
};

export default about;
