-- #############################################
-- 4. SCRIPT PARA CREAR EL STORED PROCEDURE (UPDATE)
-- #############################################

DELIMITER $$

CREATE PROCEDURE sp_update_user(
    IN p_nombre VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_contrasena VARCHAR(100),
    IN p_id INT
)
BEGIN
    -- 1. Actualizar el registro en la tabla 'usuarios'
    UPDATE usuarios 
    SET 
        nombre = p_nombre, 
        email = p_email, 
        contrasena = p_contrasena
    -- 2. Condición clave: Solo actualizar donde el ID coincida.
    WHERE 
        id = p_id;

    -- Opcional: devolver el número de filas afectadas
    SELECT ROW_COUNT() AS affected_rows;

END$$

DELIMITER ;