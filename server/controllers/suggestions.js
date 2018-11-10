const Suggestion = require('../models').Suggestion;
const productSimilarity = require('./../../libs/helpers/productSimilarity');

module.exports = {
  list(req, res) {
    return Suggestion
      .findAll({})
      .then(suggestions => res.status(200).send(suggestions))
      .catch(error => res.status(400).send(error));
  },
  get(req, res) {
    return Suggestion
      .findAll({where: {productId: req.params.productId}, limit: 12, order: [['score','DESC']]})
      .then((suggestions) => {
        res.status(200).send(suggestions);
      })
      .catch(error => res.status(400).send(error));
  },
  create(req, res) {
    const postBody = req.body;    
    const product1_id = postBody.product1_id;
    const product2_id = postBody.product2_id;
    const product1_text = postBody.product1_text;
    const product2_text = postBody.product2_text;        
    const productsSimilarity = productSimilarity(product1_id, product1_text, product2_id, product2_text);

    Suggestion.bulkCreate(productsSimilarity)
    .then(() => {
      res.status(200).send('created new items');
    })
    .catch(err => res.status(400).send(error));
  }
};
