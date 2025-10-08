-- #############################################
-- SCRIPT PARA CREAR EL STORED PROCEDURE
-- #############################################

-- 1. CAMBIAR DELIMITADOR
DELIMITER $$

-- 2. CREACIÓN DEL PROCEDIMIENTO ALMACENADO sp_create_user
CREATE PROCEDURE sp_create_user(
    IN p_nombre VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_contrasena VARCHAR(100)
)
BEGIN
    -- Insertar el nuevo usuario
    INSERT INTO usuarios (nombre, email, contrasena)
    VALUES (p_nombre, p_email, p_contrasena);

    -- Devolver el ID del registro insertado
    SELECT LAST_INSERT_ID() AS user_id;

END$$

-- 3. RESTABLECER DELIMITADOR
DELIMITER ;