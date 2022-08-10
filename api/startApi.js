const config = require('./config/configs')();
const { ApiServer, MongoosePool } = require('@dpapplications/commons-nodejs');
//const firebase = require('firebase');

function startServer() {
    const server = new ApiServer().config(config);
    // Initialize Firebase
    const fireBaseAdmin = require('./config/FireBaseAuth');
    console.log(fireBaseAdmin);
    
    server.listen(config.api.port, () => {
        console.log(`${config.api.name}:: Serviço rodando na porta - ${config.api.port}`);
    });


}

module.exports = startServer;