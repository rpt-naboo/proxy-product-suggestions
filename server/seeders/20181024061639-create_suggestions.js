const _ = require('underscore');
const stringSimilarity = require('string-similarity');
const db = require('../models')

const k = 5;

module.exports = {
  up: (queryInterface, Sequelize) => {
    const Product = db.sequelize.models.Product;
    return Product.findAll({})
      .then(products => {
        const n = products.length;
        var suggestions = []
        for(var i = 0; i < n; i++) {
          var productId = products[i].id;  
          var productName = products[i].name;          
          for(var idx = 0; idx < n; idx++) {            
            if (i !== idx) {
              let suggestProductId = products[idx].id;
              let suggestProductName = products[idx].name; 
              let score = stringSimilarity.compareTwoStrings(productName, suggestProductName);
              suggestions.push({productId: productId, suggestProductId: suggestProductId, score: score})
            }            
          }
        }
        return suggestions;
      })
      .then(suggestions => {        
        const Suggestion = db.sequelize.models.Suggestion;
        return Promise.all(suggestions.map((item) => {
          return Suggestion.create(item);
        }))    
      });

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Suggestion', null, {});
  }
};
