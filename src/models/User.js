const db = require('./db_mysql'); 

// ########################################################
// CLASE MODELO USER: LÓGICA DE INTERACCIÓN CON LA BASE DE DATOS
// (CRUD COMPLETO CON STORED PROCEDURES)
// ########################################################

class User {
    // ###########################
    // 1. CREATE (Crear un nuevo usuario) - CON STORED PROCEDURE
    // ###########################
    static create(name, email, password) {
        // Ejecuta el SP que inserta el usuario.
        const sql = `CALL sp_create_user(?, ?, ?)`;
        return db.execute(sql, [name, email, password]);
    }
    
    // ###########################
    // 2. READ ALL (Listar todos los usuarios) - CON STORED PROCEDURE
    // ###########################
    static async findAll() {
        const sql = `CALL sp_find_all_users()`;
        // El SP devuelve el resultado anidado: extraemos el array de datos puros.
        const [results] = await db.execute(sql);
        return results[0]; 
    }
    
    // ###########################
    // 3. READ BY ID (Mostrar un usuario específico) - CON STORED PROCEDURE
    // ###########################
    static async findById(id) {
        const sql = `CALL sp_find_user_by_id(?)`;
        // Extraemos el objeto usuario individual.
        const [results] = await db.execute(sql, [id]);
        return results[0][0]; 
    }
    
    // ###########################
    // 4. UPDATE (Actualizar un usuario) - CON STORED PROCEDURE
    // ###########################
    static update(id, name, email, password) {
        // Ejecutamos el SP para actualizar. Los parámetros se envían en el orden [name, email, password, id].
        const sql = `CALL sp_update_user(?, ?, ?, ?)`;
        // NOTA: El orden aquí es crucial para que coincida con la definición del SP.
        return db.execute(sql, [name, email, password, id]); 
    }

    // ###########################
    // 5. DELETE (Eliminar un usuario) - CON STORED PROCEDURE
    // ###########################
    static async destroy(id) {
        const sql = `CALL sp_delete_user(?)`;
        // El SP devuelve el conteo de filas afectadas.
        const [results] = await db.execute(sql, [id]);
        
        // Devolvemos el primer resultado del SP, que contiene el objeto { affected_rows: X }
        // Esto permite que el controlador use [result] = await User.destroy(id);
        return results;
    }
}

module.exports = User;