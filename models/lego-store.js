"use strict";

import logger from "../utils/logger.js";
import JsonStore from "./json-store.js";

const legoStore = {
    store: new JsonStore("./models/lego-store.json", { legoCollections: [] }),
    collection: "legoCollections",
    array: "sets",

    getAllLego() {
        return this.store.findAll(this.collection); //return all the collections
    },

    getLegoCollection(id) {
        return this.store.findOneBy(this.collection, (legoCollection) => legoCollection.id === id); //return a specific collection
    },

    getLegoPrice(id) {
        let totalValue = 0;
        let selectedCollection = this.store.findOneBy(this.collection, (legoCollection) => legoCollection.id === id); //for this specific collection
        selectedCollection.sets.forEach((set) => (totalValue += set.price)); //go thru sets and add up prices
        return totalValue;
    },

    addSet(id, set) {
        this.store.addItem(this.collection, id, this.array, set);
    },

    addCollection(legoCollection) {
    this.store.addCollection(this.collection, legoCollection);
    },

    removeSet(id, setId) {
    this.store.removeItem(this.collection, id, this.array, setId);
    },

    removeCollection(id) {
    const legoCollection = this.getLegoCollection(id);
    this.store.removeCollection(this.collection, legoCollection);
    },

    getUserCollections(userid) {
  return this.store.findBy(this.collection, (legoCollection => legoCollection.userid === userid));
},

searchUserCollections(search, userid) {
  return this.store.findBy(
    this.collection,
    (legoCollection => legoCollection.userid === userid && legoCollection.title.toLowerCase().includes(search.toLowerCase())))
}, 

};




export default legoStore;
