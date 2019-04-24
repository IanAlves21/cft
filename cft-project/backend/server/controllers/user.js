const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

module.exports.authUser = function(application, request, response) {

    if (request.method == 'POST') {
        var connection = application.backend.config.dbConnection;
        var userModel = new application.backend.server.models.userDAO(connection);
        
        var { email, password } = request.body;

        if(email && password) {
            var decipher = crypto.createDecipher(chiperAlgorithm, chiperPassword);
            var plainText = decipher.update(request.body.password, 'hex', 'utf8');

            userModel.authUser(request.body, function(error, result) {
                if (!result.rowCount) {
                    response.send({success: true, response: false});
                }
                else {
                    bcrypt.compare(plainText, result.rows[0].upassword, function(err, res) {
                        if (res) {
                            var token = jwt.sign({password: result.rows[0].upassword}, S3CR37);
                            
                            response.send({success: true, response: true, token: token, userId: result.rows[0].id});
                        }
                        else {
                            response.send({success: true, response: false});
                        }
                    });
                }
            });
        }
        else {
            response.send({success: false});
        }
    }
}

module.exports.checkEmail = function(application, request, response) {
    if (request.method == 'POST') {
        var connection = application.backend.config.dbConnection;
        var userModel = new application.backend.server.models.userDAO(connection);
        
        var { email } = request.body;

        if(email) {
            userModel.checkEmail(request.body, function(error, result) {
                var emailFound = (result.rowCount !== 0);
                response.send({success: true, response: emailFound});
            });
        }
        else {
            response.send({success: false});
        }
    }
}

module.exports.createUser = function(application, request, response) {
    if (request.method == 'POST') {
        var connection = application.backend.config.dbConnection;
        var userModel = new application.backend.server.models.userDAO(connection);
        
        var { name, rg, cpf, email, password } = request.body;
        
        if(name && rg && cpf && email && password) {
            var decipher = crypto.createDecipher(chiperAlgorithm, chiperPassword);
            var plainText = decipher.update(request.body.password, 'hex', 'utf8');

            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(plainText, salt, function(err, hash) {
                    request.body.password = hash;
                    
                    userModel.createUser(request.body, function(error, result) {
                        var userId = result.rows[0].id;

                        response.send({success: true, userId: userId});
                    });
                });
            });
        }
        else {
            response.send({success: false});
        }
    }
}

module.exports.deleteUser = function(application, request, response) {
    if (request.method == 'POST') {
        var connection = application.backend.config.dbConnection;
        var userModel = new application.backend.server.models.userDAO(connection);

        var { id } = request.body;

        if(id) {
            userModel.deleteUser(request.body, function(error, result) {
                response.send({success: true});
            });
        }
        else {
            response.send({success: false});
        }
    }
}

module.exports.getUser = function(application, request, response) {
    if (request.method == 'POST') {
        var connection = application.backend.config.dbConnection;
        var userModel = new application.backend.server.models.userDAO(connection);

        var { id } = request.body;

        if(id) {
            userModel.getUser(request.body, function(error, result) {
                response.send({success: true, response: result.rows});
            });
        }
        else {
            response.send({success: false});
        }
    }
}

module.exports.getUsers = function(application, request, response) {
    if (request.method == 'GET') {
        var connection = application.backend.config.dbConnection;
        var userModel = new application.backend.server.models.userDAO(connection);
        
        userModel.getUsers(function(error, result) {
            response.send({success: true, response: result.rows});
        });
    }
}

