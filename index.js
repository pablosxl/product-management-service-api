(async () => {
    require("dotenv").config();
    const config = require("./api/config/configs")(__dirname);
    
    const {MongoosePool} = require('@dpapplications/commons-nodejs');
    await MongoosePool.config(config.mongo);
    
    //Start API
    require("./api/start-api")();
})();