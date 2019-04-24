module.exports = function(application) {
  
  application.post('/item/check', function(request, response) {
    application.backend.server.controllers.item.checkItem(application, request, response);
  });

  application.post('/item/create', function(request, response) {
    application.backend.server.controllers.item.createItem(application, request, response);
  });

  application.post('/item/delete', function(request, response) {
    application.backend.server.controllers.item.deleteItem(application, request, response);
  });

  application.post('/item/get', function(request, response) {
    application.backend.server.controllers.item.getItem(application, request, response);
  });

  application.get('/itens/get', function(request, response) {
    application.backend.server.controllers.item.getItens(application, request, response);
  });

}
