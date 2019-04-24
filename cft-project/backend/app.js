// For login encryption
global.chiperAlgorithm = 'aes-256-ctr';
global.chiperPassword = 'd6F3Efeq';

// For token
global.S3CR37 = 'S3CR37';

const app = require('./config/server');

const port = 300;
app.listen(port, function() {
    console.log('Server running at port: ', port);
});