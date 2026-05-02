"use strict";
import logger from "../utils/logger.js";
import legoStore from "../models/lego-store.js";
import accounts from "./accounts.js";
import userStore from "../models/user-store.js";

const stats = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      logger.info("Stats page loading!");
      // app statistics calculations
      const legoCollections = legoStore.getAllLego();
      const users = userStore.getAllUsers();

      let numCollections = legoCollections.length;

      let numSets = legoCollections.reduce((total, collection) => total + collection.sets.length, 0);

      let average = numCollections > 0 ? (numSets / numCollections).toFixed(2) : 0;

      let longest =
        legoCollections.length > 0 ? Math.max(...legoCollections.map((collection) => collection.sets.length)) : 0;
      let longestCollections = legoCollections.filter((collection) => collection.sets.length === longest);
      let longestTitles = longestCollections.map((item) => item.title);

      let shortest =
        legoCollections.length > 0 ? Math.min(...legoCollections.map((collection) => collection.sets.length)) : 0;
      let shortestCollections = legoCollections.filter((collection) => collection.sets.length === shortest);
      let shortestTitles = shortestCollections.map((item) => item.title);

      let totalUsers = users.length;

      let collectionValue = 0;
      let endResultValue = legoCollections.forEach((collection) => {
        collectionValue += legoStore.getLegoPrice(collection.id);
      });

      // user statistics calculations
      let userCollections = legoStore.getUserCollections(loggedInUser.id);
      let userNumCollections = userCollections.length;
      let userNumSets = userCollections.reduce((total, collection) => total + collection.sets.length, 0);
      let userAverage = userNumCollections > 0 ? (userNumSets / userNumCollections).toFixed(2) : 0;

      let userLongest =
        userCollections.length > 0 ? Math.max(...userCollections.map((collection) => collection.sets.length)) : 0;
      let userLongestCollections = userCollections.filter((collection) => collection.sets.length === userLongest);
      let userLongestTitles = userLongestCollections.map((item) => item.title);

      let userShortest =
        userCollections.length > 0 ? Math.min(...userCollections.map((collection) => collection.sets.length)) : 0;
      let userShortestCollections = userCollections.filter((collection) => collection.sets.length === userShortest);
      let userShortestTitles = userShortestCollections.map((item) => item.title);

      let userCollectionValue = 0;
      let userEndResultValue = userCollections.forEach((collection) => {
        userCollectionValue += legoStore.getLegoPrice(collection.id);
      });

      const statistics = {
        displayNumCollections: numCollections,
        displayNumSets: numSets,
        displayAverage: average,
        displayLongest: longest,
        displayLongestTitles: longestTitles,
        displayShortest: shortest,
        displayShortestTitles: shortestTitles,
        displayTotalUsers: totalUsers,
        displayTotalValue: collectionValue
      };

      const userStatistics = {
        displayNumCollections: userNumCollections,
        displayNumSets: userNumSets,
        displayAverage: userAverage,
        displayLongest: userLongest,
        displayLongestTitles: userLongestTitles,
        displayShortest: userShortest,
        displayShortestTitles: userShortestTitles,
        displayTotalValue: userCollectionValue
      };

      const viewData = {
        title: "Lego Collection App Statistics",
        stats: statistics,
        userStats: userStatistics,
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
        picture: loggedInUser.picture
      };

      response.render("stats", viewData);
    } else response.redirect("/");
  }
};

export default stats;
