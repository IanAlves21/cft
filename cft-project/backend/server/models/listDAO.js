function ListDAO(connection) {
  this._connection = connection;
}

ListDAO.prototype.createList = function(params, callback) {
  const { userId } = params;
  this._connection.query('INSERT INTO list (active, user_id) VALUES (true, $1) RETURNING id', [userId], callback);
};

ListDAO.prototype.createListItem = function(params, callback) {
  const { listId, itemId, quantity } = params;
  this._connection.query('INSERT INTO list_item (list_id, item_id, quantity) VALUES ($1, $2, $3)', [listId, itemId, quantity], callback);
};

ListDAO.prototype.deleteList = function(params, callback) {
  const { listId } = params;
  this._connection.query('UPDATE list SET active = false WHERE id = $1;', [listId], callback);
};

ListDAO.prototype.getList = function(params, callback) {
  const { listId } = params;
  this._connection.query('SELECT list.*, item.*, list_item.* FROM users \
                          INNER JOIN list ON list.user_id = users.id \
                          INNER JOIN list_item ON list_item.list_id = list.id \
                          INNER JOIN item ON list_item.item_id = item.id \
                          WHERE list.active = true AND list.id = $1', [listId], callback);
};

ListDAO.prototype.getLists = function(params, callback) {
  const { userId } = params;
  this._connection.query('SELECT list.*, item.*, list_item.*  FROM users \
                          INNER JOIN list ON list.user_id = users.id \
                          INNER JOIN list_item ON list_item.list_id = list.id \
                          INNER JOIN item ON list_item.item_id = item.id \
                          WHERE list.active = true AND users.id = $1', [userId], callback);
};

module.exports = function() {
  return ListDAO;
}
