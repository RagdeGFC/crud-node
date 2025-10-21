#############################################
# SCRIPT PARA CREAR EL STORED PROCEDURE (SEARCH)
#############################################

-- 1. CAMBIAR DELIMITADOR TEMPORALMENTE
DELIMITER $$

-- 2. CREACIÓN DEL PROCEDIMIENTO ALMACENADO sp_search_users
CREATE PROCEDURE sp_search_users(
    IN p_searchTerm VARCHAR(100) -- Recibe el término de búsqueda
)
BEGIN
    -- Consulta para seleccionar usuarios activos (esta_eliminado = 0)
    -- que coincidan con el término en 'nombre' O 'email'.
    SELECT
        id,
        nombre,
        email,
        fecha_creacion
    FROM
        usuarios
    WHERE
        esta_eliminado = 0 AND -- Filtra solo no eliminados
        (
            nombre LIKE CONCAT('%', p_searchTerm, '%') OR -- Búsqueda por nombre
            email LIKE CONCAT('%', p_searchTerm, '%')    -- Búsqueda por email
        )
    ORDER BY
        id ASC;
END$$

-- 3. RESTABLECER DELIMITADOR
DELIMITER ;