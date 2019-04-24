function ItemDAO(connection) {
  this._connection = connection;
}

ItemDAO.prototype.checkItem = function(params, callback) {
  const { name, price } = params;
  this._connection.query('SELECT * FROM item WHERE active = true AND iname = $1 AND price = $2', [name, price], callback);
};

ItemDAO.prototype.createItem = function(params, callback) {
  const { name, price } = params;
  this._connection.query('INSERT INTO item (active, iname, price) VALUES (true, $1, $2) RETURNING id', [name, price], callback);
};

ItemDAO.prototype.deleteItem = function(params, callback) {
  const { id } = params;
  this._connection.query('UPDATE item SET active = false WHERE id = $1;', [id], callback);
};

ItemDAO.prototype.getItem = function(params, callback) {
  const { id } = params;
  this._connection.query('SELECT * FROM item WHERE id = $1', [id], callback);
};

ItemDAO.prototype.getItens = function(callback) {
  this._connection.query('SELECT * FROM item WHERE active = true ORDER BY iname ASC;', callback);
};

module.exports = function() {
  return ItemDAO;
}
