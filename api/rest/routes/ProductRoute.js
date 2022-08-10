const { RouteLocator: router } = require('@dpapplications/commons-nodejs');
const ProductController = require('../controllers/ProductController');
const validator = require('express-joi-validation').createValidator({})

module.exports = function(app) {

    router.post('/product', 
        async (req, res, next) => await new ProductController().create(req, res, next));
    
    router.put('/product', 
        async (req, res, next) => await new ProductController().update(req, res, next));
    
    router.get('/product/:id', 
        async (req, res, next) => await new ProductController().getById(req, res, next));
    
    router.delete('/product/:id', 
        async (req, res, next) => await new ProductController().deleteById(req, res, next));

    router.get('/products', 
        async (req, res, next) => await new ProductController().getProducts(req, res, next));
    
    router.post('/product/company', 
        async (req, res, next) => await new ProductController().insertCompanyProduct(req, res, next));
    

}