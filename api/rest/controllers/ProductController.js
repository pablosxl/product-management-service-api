const ProductService = require("../../business/services/ProductService");
const ResponsibleService = require("../../business/services/ResponsibleService");
const { IdResponse } = require("../response/IdResponse");

class ProductController {
    constructor() {
        this.productService = new ProductService();
    }

    async create(req, res, next) {
        const data = req.body;

        const result = await this.productService.create(data);

        res.status(201);
        res.send(new IdResponse(result));
        next();
    }
    async update(req, res, next) {
        const data = req.body;

        const result = await this.productService.update(data);

        res.status(204);
        res.send();
        next();
    }

    async getById(req, res, next) {
        const id = req.params.id;
        const data = await this.productService.getById(id);

        res.status(200);
        res.send(data);
        next();
    }

    async getProducts(req, res, next) {
        const categoryId = req.query.categoryId;
        const animalTypeId = req.query.animalTypeId;

        const result = await this.productService.getProducts(categoryId, animalTypeId);

        res.status(200);
        res.send(result);
        next();
    }

    async deleteById(req, res, next) {
        const id = req.params.id

        const result = await this.productService.deleteById(id);

        res.status(204);
        res.send();
        next();
    }

    async uploadFile(req, res, next) {

        const data = req.files.File;
        const result = await this.productService.uploadFile(data);
        res.status(204);
        res.send();
        next();
    }

    async insertCompanyProduct(req, res, next) {
        const data = req.body;

        const result = await this.productService.insertCompanyProduct(data);

        res.status(201);
        res.send(new IdResponse(result));
        next();
    }
    
}

module.exports = ProductController;