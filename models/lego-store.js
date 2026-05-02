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
        selectedCollection.sets.forEach((set) => (totalValue += parseInt(set.price))); //go thru sets and add up prices
        return totalValue;
    },

    async addSet(id, set, file, response) {
        try {
            set.picture = await this.store.addToCloudinary(file);
            //this.store.addCollection(this.collection, set);
            this.store.addItem(this.collection, id, this.array, set);
            response();
        } catch (error) {
            logger.error("Error processing set:" + error);
            response(error);
        }
        //this.store.addItem(this.collection, id, this.array, set);
    },

    async addCollection(legoCollection, file, response) {
        try {
            legoCollection.image = await this.store.addToCloudinary(file);
            this.store.addCollection(this.collection, legoCollection);
            response();
        } catch (error) {
            logger.error("Error processing playlist:", error);
            response(error);
        }
    //this.store.addCollection(this.collection, legoCollection);
    },

    removeSet(id, setId) {
    this.store.removeItem(this.collection, id, this.array, setId);
    },

    async removeCollection(id, response) {
        const legoCollection = this.getLegoCollection(id);

        if (legoCollection.image && legoCollection.image.public_id) {
            try {
                await this.store.deleteFromCloudinary(legoCollection.image.public_id);
                logger.info("Cloudinary image deleted");
            } catch (err) {
                logger.error("Failed to delete Cloudinary image:", err);
            }
        }

        this.store.removeCollection(this.collection, legoCollection);
        response();
    },

    async editSet(id, setId, updatedSet, file, response) {
        //this.store.editItem(this.collection, id, setId, this.array, updatedSet);
        try {
            set.picture = await this.store.addToCloudinary(file);
            this.store.editItem(this.collection, id, setId, this.array, updatedSet);
            response();
        } catch (error) {
            logger.error("Error processing set:" + error);
            response(error);
        }
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
