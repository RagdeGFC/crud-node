-- #############################################
-- 5. SCRIPT PARA CREAR EL STORED PROCEDURE (DELETE)
-- #############################################

DELIMITER $$

CREATE PROCEDURE sp_delete_user(
    IN p_id INT -- Recibe la ID del usuario a eliminar
)
BEGIN
    -- Eliminar el registro de la tabla 'usuarios'
    DELETE FROM usuarios 
    WHERE id = p_id;

    -- Devolver el número de filas afectadas (útil para validar en el modelo).
    SELECT ROW_COUNT() AS affected_rows;

END$$

DELIMITER ;