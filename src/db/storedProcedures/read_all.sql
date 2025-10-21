#############################################
# SCRIPT PARA CREAR EL STORED PROCEDURE (READ ALL)
#############################################

-- 1. CAMBIAR DELIMITADOR TEMPORALMENTE
DELIMITER $$

-- 2. CREACIÓN DEL PROCEDIMIENTO ALMACENADO sp_find_all_users
CREATE PROCEDURE sp_find_all_users()
BEGIN
    -- Consulta para seleccionar todos los usuarios activos (esta_eliminado = 0).
    -- BUENA PRÁCTICA: NO se selecciona la columna 'contrasena' por seguridad.
    SELECT
        id,
        nombre,
        email,
        fecha_creacion -- Mostramos la fecha de creación
    FROM
        usuarios
    WHERE
        esta_eliminado = 0 -- FILTRAR SOLO USUARIOS NO ELIMINADOS
    ORDER BY
        id ASC; -- Ordenamos por ID ascendente para un orden predecible
END$$

-- 3. RESTABLECER DELIMITADOR
DELIMITER ;