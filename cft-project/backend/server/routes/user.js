
module.exports = function(application) {
  
  application.post('/user/auth', function(request, response) {
    application.backend.server.controllers.user.authUser(application, request, response);
  });

  application.post('/user/check/email', function(request, response) {
    application.backend.server.controllers.user.checkEmail(application, request, response);
  });

  application.post('/user/create', function(request, response) {
    application.backend.server.controllers.user.createUser(application, request, response);
  });

  application.post('/user/delete', function(request, response) {
    application.backend.server.controllers.user.deleteUser(application, request, response);
  });

  application.post('/user/get', function(request, response) {
    application.backend.server.controllers.user.getUser(application, request, response);
  });

  application.get('/users/get', function(request, response) {
    application.backend.server.controllers.user.getUsers(application, request, response);
  });

}
