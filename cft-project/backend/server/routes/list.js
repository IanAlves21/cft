module.exports = function(application) {
  
  application.post('/list/create', function(request, response) {
    application.backend.server.controllers.list.createList(application, request, response);
  });

  application.post('/list/delete', function(request, response) {
    application.backend.server.controllers.list.deleteList(application, request, response);
  });

  application.get('/list/get', function(request, response) {
    application.backend.server.controllers.list.getList(application, request, response);
  });

  application.post('/list/get', function(request, response) {
    application.backend.server.controllers.list.getList(application, request, response);
  });

  application.post('/lists/get', function(request, response) {
    application.backend.server.controllers.list.getLists(application, request, response);
  });

}
