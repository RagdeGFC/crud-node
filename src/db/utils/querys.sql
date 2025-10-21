USE crud_app;
-- 1. Ver la Tabla Completa con Todas las Columnas 
SELECT * FROM usuarios;
SELECT id, nombre, email, esta_eliminado, fecha_creacion, fecha_actualizacion
FROM usuarios;

-- 2. Contar el Número de Usuarios Activos
SELECT COUNT(id) AS total_activos FROM usuarios WHERE esta_eliminado = 0;

-- 3. Consultar la Estructura (Esquema) de la Tabla
DESCRIBE usuarios; 
DESC usuarios;

-- 4. Consultar la Base de Datos Completa, las tablas y el estatus de los
SHOW DATABASES;
SHOW TABLES;
SHOW PROCEDURE STATUS;

-- 5. Ver Solo Usuarios Activos (Como lo hace la App)
SELECT id, nombre, email, fecha_creacion
FROM usuarios
WHERE esta_eliminado = 0
ORDER BY id ASC;

-- 6. Consultar un Usuario Específico por ID
SELECT id, nombre, email, esta_eliminado, fecha_creacion, fecha_actualizacion
FROM usuarios
WHERE id = 1;

-- 7. Consultar un Usuario Eliminado
SELECT id, nombre, email, esta_eliminado
FROM usuarios
WHERE esta_eliminado = 1;

-- 8 Consultar los Stored Procedures
SHOW PROCEDURE STATUS WHERE Db = 'crud_app'; 

-- 9 Ver el Código Fuente de un Stored Procedure
SHOW CREATE PROCEDURE sp_create_user;
SHOW CREATE PROCEDURE sp_delete_user;
SHOW CREATE PROCEDURE sp_find_all_users;
SHOW CREATE PROCEDURE sp_search_users;
SHOW CREATE PROCEDURE sp_update_user;

-- 10 Ver todos los índices que tiene la tabla usuarios 
SHOW INDEX FROM usuarios;

-- Índice Primario (PRIMARY KEY): En la columna id. Este es el índice más rápido y asegura que cada ID es única.
-- Índice Único (UNIQUE): En la columna email. Asegura que no puede haber dos usuarios con el mismo correo y permite una búsqueda muy rápida por email.
-- Índice Común (INDEX): En las columnas nombre y esta_eliminado. Estos permiten búsquedas más rápidas y son esenciales para la funcionalidad de búsqueda flexible que acabamos de implementar.