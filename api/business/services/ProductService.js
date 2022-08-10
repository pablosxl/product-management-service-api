const { NotFoundException } = require("@dpapplications/commons-nodejs");
const GridFsLib = require("../../lib/GridFsLib");
const ProductRepository = require("../repositories/ProductRepository");
const CompanyProductService = require("./CompanyProductService");

class ProductService {
    constructor() {
        this.productRepository = new ProductRepository();
        this.companyProductService = new CompanyProductService();
    }

    async create(product){
        return await this.productRepository.create(product);
    }

    async update(product){
        const persistentModel = await this.getById(product.id, false);

        if(product.name !== undefined) {
            persistentModel.name = product.name;
        }

        if(product.description !== undefined) {
            persistentModel.description = product.description;
        }

        if(product.measure !== undefined) {
            persistentModel.measure = product.measure;
        }

        if(product.measureType !== undefined) {
            persistentModel.measureType = product.measureType;
        }

        if(product.categoryId !== undefined) {
            persistentModel.categoryId = product.categoryId;
        }

        if(product.animalTypeId !== undefined) {
            persistentModel.animalTypeId = product.animalTypeId;
        }

        if(product.imageId !== undefined) {
            persistentModel.imageId = product.imageId;  
        }

        if(product.active !== undefined) {
            persistentModel.active = product.active;
        }

        const updateModel = await this.productRepository.update(persistentModel);

        return updateModel;
    }

    async getById(id){
        const result = await this.productRepository.getById(id);

        if(!result)
            throw new NotFoundException('Produto não encontrado ::' + id);
        
        return result;
    }

    async getProducts() {
        return await this.productRepository.getList();
    }

    async deleteById(id) {
        const product = await this.getById(id);
        product.active = false;
        
        const response = await this.productRepository.update(product);
        
        return response;
    }

}

module.exports = ProductService;