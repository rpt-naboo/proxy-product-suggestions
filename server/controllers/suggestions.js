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
    const postBody = req.query;
    const itemPerPage = Number(postBody.itemPerPage);
    const currentPageNumber = Number(postBody.currentPageNumber);
    const offset = (currentPageNumber - 1) * itemPerPage;
    
    return Suggestion
      .findAll({where: {productId: req.params.productId}
        , offset: offset
        , limit: itemPerPage
        , order: [['score','DESC']]})
      .then((suggestions) => {
        suggestions.length === itemPerPage ? nextPage = currentPageNumber + 1 : nextPage = 0;
        offset > 0 ? previousPage = currentPageNumber - 1 : previousPage = 0;
        const result  = {
          previousPage: previousPage,
          nextPage: nextPage,
          itemPerPage: itemPerPage,
          suggestions: suggestions
        }

        res.status(200).send(result);
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
