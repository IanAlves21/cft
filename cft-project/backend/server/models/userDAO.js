function UserDAO(connection) {
  this._connection = connection;
}

UserDAO.prototype.authUser = function(params, callback) {
  const { email } = params;
  this._connection.query('SELECT * FROM users WHERE active = true AND email = $1', [email], callback);
};

UserDAO.prototype.checkEmail = function(params, callback) {
  const { email } = params;
  this._connection.query('SELECT * FROM users WHERE email = $1', [email], callback);
};

UserDAO.prototype.createUser = function(params, callback) {
  const { name, rg, cpf, email, password } = params;
  this._connection.query('INSERT INTO users (active, cpf, rg, uname, email, upassword) VALUES (true, $1, $2, $3, $4, $5) RETURNING id', [cpf, rg, name, email, password], callback);
};

UserDAO.prototype.deleteUser = function(params, callback) {
  const { id } = params;
  this._connection.query('UPDATE users SET active = false WHERE id = $1;', [id], callback);
};

UserDAO.prototype.getUser = function(params, callback) {
  const { id } = params;
  this._connection.query('SELECT uname, cpf, rg, email FROM users WHERE id = $1', [id], callback);
};

UserDAO.prototype.getUsers = function(callback) {
  this._connection.query('SELECT uname, cpf, rg, email FROM users WHERE active = true ORDER BY uname ASC;', callback);
};

module.exports = function() {
  return UserDAO;
}
