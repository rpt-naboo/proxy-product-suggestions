'use strict';
const stringSimilarity = require('string-similarity');

module.exports = (product1_id, product1_text, product2_id, product2_text) => {
  let score = stringSimilarity.compareTwoStrings(product1_text, product2_text);
  let result = []
  if( score > 0.1) {
	  result = [
	    {productId: product1_id, suggestProductId: product2_id, score: score},
	    {productId: product2_id, suggestProductId: product1_id, score: score}
	  ];  	
  }
  return result;
};
