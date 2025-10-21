#############################################
# SQL COMPLETO PARA CREAR LA BASE DE DATOS CRUD APP
#############################################

-- 1. CREACIÓN DE LA BASE DE DATOS
CREATE DATABASE IF NOT EXISTS crud_app;

-- 2. SELECCIÓN DE LA BASE DE DATOS
USE crud_app;

-- 3. CREACIÓN DE LA TABLA 'usuarios'
-- Se incluyen: Soft Delete (esta_eliminado) y Timestamps.
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(100) NOT NULL,
    -- Columna de Borrado Lógico (Soft Delete). 0 = Viable, 1 = Eliminado.
    esta_eliminado BOOLEAN NOT NULL DEFAULT 0,
    -- Timestamps
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. CREACIÓN DE ÍNDICES ADICIONALES
-- Mejoramos el rendimiento de las búsquedas al crear índices en columnas frecuentemente usadas.
-- Ya tenemos el índice PRIMARY KEY en 'id' y UNIQUE en 'email'.
CREATE INDEX idx_nombre ON usuarios (nombre);
-- Creamos un índice compuesto para consultas que filtran por estado de eliminación y buscan por nombre/email.
CREATE INDEX idx_estado_nombre_email ON usuarios (esta_eliminado, nombre, email);


-- 5. INSERCIÓN DE DATOS DE PRUEBA
-- Inserta algunos registros iniciales.
INSERT INTO usuarios (nombre, email, contrasena) VALUES
('Pedro Picapiedra', 'pedro@piedra.com', 'secreta123'),
('Vilma Mármol', 'vilma@marmol.com', 'miClaveSegura');


#############################################
# FIN DEL SCRIPT
#############################################