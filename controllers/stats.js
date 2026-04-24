"use strict";
import logger from "../utils/logger.js";
import legoStore from "../models/lego-store.js";

const stats = {
  createView(request, response) {
    logger.info("Stats page loading!");
    // app statistics calculations
    const legoCollections = legoStore.getAllLego();

    let numCollections = legoCollections.length;
    
    let numSets = legoCollections.reduce((total, collection) => total + collection.sets.length, 0);
	
	let average = numCollections > 0 ? (numSets / numCollections).toFixed(2) : 0;

    let longest = legoCollections.length > 0 ? Math.max(...legoCollections.map(collection => collection.sets.length)) : 0;
    let longestCollections = legoCollections.filter(collection => collection.sets.length === longest);
    let longestTitles = longestCollections.map(item => item.title);

    let shortest = legoCollections.length > 0 ? Math.min(...legoCollections.map(collection => collection.sets.length)) : 0;
    let shortestCollections = legoCollections.filter(collection => collection.sets.length === shortest);
    let shortestTitles = shortestCollections.map(item => item.title);
      
    const statistics = {
      displayNumCollections: numCollections,
      displayNumSets: numSets,
	    displayAverage: average,
        displayLongest: longest,
        displayLongestTitles: longestTitles,
        displayShortest: shortest,
        displayShortestTitles: shortestTitles,
    }

    const viewData = {
      title: "Lego Collection App Statistics",
      stats: statistics
    };
  
    response.render("stats", viewData);
  },
};

export default stats;
