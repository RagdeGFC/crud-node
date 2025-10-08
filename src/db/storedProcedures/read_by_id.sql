-- #############################################
-- SCRIPT PARA CREAR EL STORED PROCEDURE (READ BY ID)
-- #############################################

-- 1. CAMBIAR DELIMITADOR TEMPORALMENTE
DELIMITER $$

-- 2. CREACIÓN DEL PROCEDIMIENTO ALMACENADO sp_find_user_by_id
CREATE PROCEDURE sp_find_user_by_id(
    IN p_id INT -- Recibe la ID del usuario a buscar
)
BEGIN
    -- Consulta para seleccionar un solo usuario por ID.
    SELECT 
        id, 
        nombre, 
        email 
    FROM 
        usuarios
    WHERE 
        id = p_id;

END$$

-- 3. RESTABLECER DELIMITADOR
DELIMITER ;