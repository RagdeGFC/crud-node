-- #############################################
-- SCRIPT PARA CREAR EL STORED PROCEDURE (READ ALL)
-- #############################################

-- 1. CAMBIAR DELIMITADOR TEMPORALMENTE
DELIMITER $$

-- 2. CREACIÓN DEL PROCEDIMIENTO ALMACENADO sp_find_all_users
CREATE PROCEDURE sp_find_all_users()
BEGIN
    -- 1. Consulta para seleccionar todos los usuarios.
    -- BUENA PRÁCTICA: NO se selecciona la columna 'contrasena' por seguridad.
    SELECT 
        id, 
        nombre, 
        email 
    FROM 
        usuarios
    ORDER BY 
        id ASC; -- Ordenamos por ID ascendente para un orden predecible

END$$

-- 3. RESTABLECER DELIMITADOR
DELIMITER ;