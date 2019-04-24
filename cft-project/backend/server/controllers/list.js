module.exports.createList = function(application, request, response) {
    if (request.method == 'POST') {
        var connection = application.backend.config.dbConnection;
        var listModel = new application.backend.server.models.listDAO(connection);
        var itemModel = new application.backend.server.models.itemDAO(connection);

        var { userId, itens } = request.body;
        
        if(userId && itens) {
            listModel.createList({userId: userId}, function(error, resultList) {
                var listId = resultList.rows[0].id;
                
                for (let index in itens) {
                    let item = {name: itens[index].name, price: itens[index].price};

                    itemModel.checkItem(item, function(error, resultItem) {
                        var itemFound = (resultItem.rowCount !== 0);
                        
                        if (itemFound) {
                            let listItem = {listId: listId, itemId: resultItem.rows[0].id, quantity: itens[index].quantity};
                            listModel.createListItem(listItem, function(error, result) {});
                        }
                        else {
                            itemModel.createItem(item, function(error, result) {
                                let listItem = {listId: listId, itemId: result.rows[0].id, quantity: itens[index].quantity};
                                listModel.createListItem(listItem, function(error, result) {});
                            });
                        }
                    });
                }
                response.send({success: true, listId: listId});
            });
        }
        else {
            response.send({success: false});
        }
    }
}

module.exports.deleteList = function(application, request, response) {
    if (request.method == 'POST') {
        var connection = application.backend.config.dbConnection;
        var listModel = new application.backend.server.models.listDAO(connection);
        
        var { listId } = request.body;

        if(listId) {
            listModel.deleteList(request.body, function(error, result) {
                response.send({success: true});
            });
        }
        else {
            response.send({success: false});
        }
    }
}

module.exports.getList = function(application, request, response) {
    var connection = application.backend.config.dbConnection;
    var listModel = new application.backend.server.models.listDAO(connection);
    
    var listId = request.body.listId ? request.body.listId : request.query.listId;

    if (listId) {
        listModel.getList({listId: listId}, function(error, result) {
            response.send({success: true, response: result.rows});
        });
    }
    else {
        response.send({success: false});
    }
}

module.exports.getLists = function(application, request, response) {
    if (request.method == 'POST') {
        var connection = application.backend.config.dbConnection;
        var listModel = new application.backend.server.models.listDAO(connection);
        
        var { userId } = request.body;

        if (userId) {
            listModel.getLists(request.body, function(error, result) {
                response.send({success: true, response: result.rows});
            });
        }
        else {
            response.send({success: false});
        }
    }
}

