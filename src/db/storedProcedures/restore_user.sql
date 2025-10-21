#############################################
# SCRIPT PARA CREAR EL STORED PROCEDURE (RESTORE)
#############################################

DELIMITER $$

CREATE PROCEDURE sp_restore_user(
    IN p_id INT -- Recibe la ID del usuario a restaurar
)
BEGIN
    -- Cambiamos el estado de Soft Delete de 1 (Eliminado) a 0 (Activo).
    UPDATE usuarios
    SET esta_eliminado = 0
    WHERE id = p_id;

    -- Devolvemos el número de filas afectadas.
    SELECT ROW_COUNT() AS affected_rows;
END$$

DELIMITER ;