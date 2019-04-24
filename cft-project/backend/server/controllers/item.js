module.exports.checkItem = function(application, request, response) {
    if (request.method == 'POST') {
        var connection = application.backend.config.dbConnection;
        var itemModel = new application.backend.server.models.itemDAO(connection);

        var { name, price } = request.body;

        if(name && price) {
            itemModel.checkItem(request.body, function(error, result) {
                var itemFound = (result.rowCount !== 0);
                if (itemFound) {
                    response.send({success: true, response: true, itemId: result.rows[0].id});
                }
                else {
                    response.send({success: true, response: false});
                }
            });
        }
        else {
            response.send({success: false});
        }
    }
}

module.exports.createItem = function(application, request, response) {
    if (request.method == 'POST') {
        var connection = application.backend.config.dbConnection;
        var itemModel = new application.backend.server.models.itemDAO(connection);

        var { name, price } = request.body;

        if(name && price) {
            itemModel.createItem(request.body, function(error, result) {
                var itemId = result.rows[0].id;

                response.send({success: true, itemId: itemId});
            });
        }
        else {
            response.send({success: false});
        }
    }
}

module.exports.deleteItem = function(application, request, response) {
    if (request.method == 'POST') {
        var connection = application.backend.config.dbConnection;
        var itemModel = new application.backend.server.models.itemDAO(connection);

        var { id } = request.body;

        if(id) {
            itemModel.deleteItem(request.body, function(error, result) {
                response.send({success: true});
            });
        }
        else {
            response.send({success: false});
        }
    }
}

module.exports.getItem = function(application, request, response) {
    if (request.method == 'POST') {
        var connection = application.backend.config.dbConnection;
        var itemModel = new application.backend.server.models.itemDAO(connection);

        var { id } = request.body;

        if(id) {
            itemModel.getItem(request.body, function(error, result) {
                response.send({success: true, response: result.rows});
            });
        }
        else {
            response.send({success: false});
        }
    }
}

module.exports.getItens = function(application, request, response) {
    if (request.method == 'GET') {
        var connection = application.backend.config.dbConnection;
        var itemModel = new application.backend.server.models.itemDAO(connection);

        itemModel.getItens(function(error, result) {
            response.send({success: true, response: result.rows});
        });
    }
}
