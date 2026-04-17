'use strict';

import logger from '../utils/logger.js';
import legoStore from '../models/lego-store.js';
import { v4 as uuidv4 } from 'uuid';


const legoCollection = {
  createView(request, response) {
    const legoCollectionId = request.params.id;
    logger.debug(`Lego Collection id = ${legoCollectionId}`);
    
    const viewData = {
      title: 'Lego Collection', //top of tab
      thisLegoCollection: legoStore.getLegoCollection(legoCollectionId), //finds this specific lego collection and stores it
      thisLegoCollectionValue: legoStore.getLegoPrice(legoCollectionId) //adds up all the costs of each set in this lego collection
    };

    response.render('legoCollection', viewData);
  },

  addSet(request, response) {
    const legoCollectionId = request.params.id;
    const collection = legoStore.getLegoCollection(legoCollectionId);
    const newSet = {
      id: uuidv4(),
      name: request.body.name,
      code: request.body.code,
      pieces: request.body.pieces,
      price: request.body.price
    };
    legoStore.addSet(legoCollectionId, newSet);
    response.redirect('/legoCollection/' + legoCollectionId);
  },

  deleteSet(request, response) {
    const legoCollectionId = request.params.id;
    const setId = request.params.setid;
    logger.debug(`Deleting Set  $(setId} from Collection ${legoCollectionId}`);
    legoStore.removeSet(legoCollectionId, setId);
    response.redirect('/legoCollection/' + legoCollectionId);
  },


};

export default legoCollection;
