const db = require('./db_mysql');

// ########################################################
// CLASE MODELO USER: LÓGICA DE INTERACCIÓN CON LA BASE DE DATOS
// (CRUD COMPLETO CON STORED PROCEDURES)
// ########################################################

class User {

    // ###########################
    // 1. CREATE (Crear un nuevo usuario)
    // ###########################
    static create(name, email, password) {
        // Ejecuta el SP que inserta el usuario.
        const sql = 'CALL sp_create_user(?, ?, ?)';
        // MySQL gestiona el timestamp de creación automáticamente
        return db.execute(sql, [name, email, password]);
    }

    // ###########################
    // 2. READ ALL / SEARCH (Listar todos los usuarios y Búsqueda)
    // ###########################
    static async findAll(searchTerm = '') {
        let sql;
        let params = [];

        if (searchTerm) {
            // Si hay un término de búsqueda, usamos el SP de búsqueda.
            sql = 'CALL sp_search_users(?)';
            params = [searchTerm];
        } else {
            // Si no hay término, usamos el SP normal para leer todos (no eliminados).
            sql = 'CALL sp_find_all_users()';
        }

        // El SP devuelve el resultado anidado: extraemos el array de datos puros.
        const [results] = await db.execute(sql, params);
        
        // El resultado siempre será el primer elemento del array.
        return results[0];
    }

    // ###########################
    // 3. READ BY ID (Mostrar un usuario específico)
    // ###########################
    static async findById(id) {
        const sql = 'CALL sp_find_user_by_id(?)';

        // Ejecutamos la consulta.
        const [results] = await db.execute(sql, [id]);

        // Extraemos el objeto usuario individual.
        // results[0] es el array de filas, results[0][0] es la primera fila (el usuario).
        return results[0][0];
    }

    // ###########################
    // 4. UPDATE (Actualizar un usuario)
    // ###########################
    static update(id, name, email, password) {
        // Ejecutamos el SP para actualizar. 
        // MySQL gestiona el timestamp de actualización automáticamente.
        const sql = 'CALL sp_update_user(?, ?, ?, ?)';
        // NOTA: El orden de los parámetros es crucial para que coincida con la definición del SP:
        // [p_nombre, p_email, p_contrasena, p_id]
        return db.execute(sql, [name, email, password, id]);
    }

    // ###########################
    // 5. DELETE (Soft Delete)
    // ###########################
    static async destroy(id) {
        const sql = 'CALL sp_delete_user(?)';
        // El SP devuelve el conteo de filas afectadas por el UPDATE (Soft Delete).
        const [results] = await db.execute(sql, [id]);
        
        // Devolvemos el array de resultados.
        return results;
    }

     // ###########################
    // 6. RESTORE (Recuperar un usuario de Soft Delete)
    // ###########################
    static async restore (id) {
        const sql = 'CALL sp_restore_user(?)';
        // El SP devuelve el conteo de filas afectadas.
        const [results] = await db.execute(sql, [id]);
        return results;
    }
}

module.exports = User;