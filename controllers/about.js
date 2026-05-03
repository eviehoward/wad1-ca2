"use strict";

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import accounts from "./accounts.js";
import commentStore from "../models/comment-store.js";
import { v4 as uuidv4 } from "uuid";

const about = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("About page loading!"); //console

    if (loggedInUser) {
      const viewData = {
        title: "About the playlist app", //top of tab
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
        picture: loggedInUser.picture,
        info: appStore.getAppInfo(), //retrieve info from appstore
        comments: commentStore.getAllComments(),
      };
      response.render("about", viewData);
    } else response.redirect("/");
  },

  addComment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const timestamp = new Date();

    const newComment = {
      fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
      userid: loggedInUser.id,
      id: uuidv4(),
      content: request.body.content,
      timestamp: timestamp,
    }

    commentStore.addComment(newComment);
    response.redirect("/about");
  }
};

export default about;
