#############################################
# SCRIPT PARA CREAR EL STORED PROCEDURE (READ BY ID)
#############################################

-- 1. CAMBIAR DELIMITADOR TEMPORALMENTE
DELIMITER $$

-- 2. CREACIÓN DEL PROCEDIMIENTO ALMACENADO sp_find_user_by_id
CREATE PROCEDURE sp_find_user_by_id(
    IN p_id INT -- Recibe la ID del usuario a buscar
)
BEGIN
    -- Consulta para seleccionar un solo usuario por ID y que NO esté eliminado.
    SELECT
        id,
        nombre,
        email,
        fecha_creacion -- Incluimos la fecha de creación
    FROM
        usuarios
    WHERE
        id = p_id AND esta_eliminado = 0; -- Condición de Soft Delete
END$$

-- 3. RESTABLECER DELIMITADOR
DELIMITER ;