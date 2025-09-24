const db = require("./sqlite");

// Se agregan email y password como parámetros
const create = (name, email, password, callback) => {
  // Se modifican la sentencia SQL y los valores a insertar
  const sql = `INSERT INTO categories (name, email, password) VALUES (?, ?, ?)`;

  db.run(sql, [name, email, password], function (error) {
    if (error) {
      return callback(error);
    }

    callback(null, this.lastID);
  });
};

const findAll = (callback) => {
  // Se seleccionan todos los campos. SELECT * es correcto.
  const sql = `SELECT * FROM categories`;

  db.all(sql, (error, rows) => {
    if (error) {
      return callback(error);
    }

    callback(null, rows);
  });
};

const findById = (id, callback) => {
  const sql = `SELECT * FROM categories WHERE id = ?`;

  db.get(sql, [id], (error, row) => {
    if (error) {
      return callback(error);
    }

    callback(null, row);
  });
};

// Se agregan email y password como parámetros
const update = (id, name, email, password, callback) => {
  // Se modifican la sentencia SQL y los valores a actualizar
  const sql = `UPDATE categories SET name = ?, email = ?, password = ? WHERE id = ?`;

  db.run(sql, [name, email, password, id], function (error) {
    if (error) {
      return callback(error);
    }

    callback(null, this.changes);
  });
};

const destroy = (id, callback) => {
  const sql = `DELETE FROM categories WHERE id = ?`;

  db.run(sql, [id], function (error) {
    if (error) {
      return callback(error);
    }

    callback(null, this.changes);
  });
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  destroy,
};