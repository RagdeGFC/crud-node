#############################################
# SCRIPT PARA CREAR EL STORED PROCEDURE (SOFT DELETE CORREGIDO)
#############################################
DELIMITER $$
CREATE PROCEDURE sp_delete_user(
    IN p_id INT 
)
BEGIN
    UPDATE usuarios
    SET 
        esta_eliminado = 1,
        -- ESTA ES LA LÍNEA CLAVE QUE DEBE EJECUTARSE
        email = CONCAT(email, '.deleted.', p_id, '.', UNIX_TIMESTAMP())
    WHERE id = p_id;
    SELECT ROW_COUNT() AS affected_rows;
END$$
DELIMITER ;