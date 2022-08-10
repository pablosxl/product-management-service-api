const BaseRepository = require("./BaseRepository");
const Product = require("../models/Product");
const  mongoose = require("mongoose");

class ProductRepository extends BaseRepository {
    constructor(){
        super(Product);
    }

    async create (product) {
        return await this.$save(product);
    }

    async update(product) {
      return await this.$save(product);
    }
    
    async getById(id) {
      return await this.$getById(id);
    }

    async getList(categoryId) {
        return await this.$listAggregate([
            ...(!!categoryId ? [{
                '$match': {
                    'categoryId': mongoose.Types.ObjectId(categoryId)
                }
            }]: []),
            {
              '$match': {
                  'active': true
              }
            },
            {
              '$lookup': {
                'from': 'category', 
                'localField': 'categoryId', 
                'foreignField': '_id', 
                'as': 'category_collection'
              }
            }, {
              '$unwind': {
                'path': '$category_collection'
              }
            }, {
              '$set': {
                'category': '$category_collection.name'
              }
            }, {
              '$project': {
                'category_collection': 0, 
                'categoryId': 0,
              }
            }
          ]);
    }

    async deleteById(id) {
        return await this.$deleteOne({
            _id: mongoose.Types.ObjectId(id)
        });
    }
}

module.exports = ProductRepository;