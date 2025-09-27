const db = require('./db_mysql'); 

// Se usa un estilo de programación moderno (Promesas/Async-Await) 
// porque es el estándar con 'mysql2/promise()', es más limpio 

class User {
    // INSERT (Crear un nuevo usuario)
    static create(name, email, password) {
        const sql = `INSERT INTO usuarios (nombre, email, contrasena) VALUES (?, ?, ?)`;
        // db.execute() devuelve una Promesa con los resultados.
        // Los valores se pasan en un array separado para evitar inyecciones SQL (seguridad).
        return db.execute(sql, [name, email, password]);
    }

    // SELECT ALL (Listar todos los usuarios)
    static findAll() {
        // Seleccionamos la 'id', 'nombre' y 'email'. La contraseña NO se debe listar.
        const sql = `SELECT id, nombre, email FROM usuarios`;
        // db.execute devuelve [rows, fields]. 'rows' son nuestros datos.
        return db.execute(sql);
    }

    // SELECT BY ID (Mostrar un usuario específico)
    static findById(id) {
        // Obtenemos solo un usuario por su ID
        const sql = `SELECT id, nombre, email FROM usuarios WHERE id = ?`;
        return db.execute(sql, [id]);
    }

    // UPDATE (Actualizar un usuario)
    static update(id, name, email, password) {
        const sql = `UPDATE usuarios SET nombre = ?, email = ?, contrasena = ? WHERE id = ?`;
        return db.execute(sql, [name, email, password, id]);
    }

    // DELETE (Eliminar un usuario)
    static destroy(id) {
        const sql = `DELETE FROM usuarios WHERE id = ?`;
        return db.execute(sql, [id]);
    }
}

module.exports = User;