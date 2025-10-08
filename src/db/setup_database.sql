-- #############################################
-- SQL COMPLETO PARA CREAR LA BASE DE DATOS CRUD_APP
-- #############################################

-- 1. CREACIÓN DE LA BASE DE DATOS
-- Crea la base de datos 'crud_app' si aún no existe en el sistema.
CREATE DATABASE IF NOT EXISTS crud_app;

-- 2. SELECCIÓN DE LA BASE DE DATOS
-- Indica que las siguientes consultas se ejecutarán dentro de 'crud_app'.
USE crud_app;

-- 3. CREACIÓN DE LA TABLA 'usuarios'
-- Incluye todos los campos necesarios para el CRUD, incluyendo 'contrasena'.
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(100) NOT NULL -- Campo agregado para que el proyecto funcione.
);

-- 4. INSERCIÓN DE DATOS DE PRUEBA
-- Inserta algunos registros iniciales para que el CRUD tenga datos para Leer (Read).
INSERT INTO usuarios (nombre, email, contrasena) VALUES
('Pedro Picapiedra', 'pedro@piedra.com', 'secreta123'),
('Vilma Mármol', 'vilma@marmol.com', 'miClaveSegura');

-- #############################################
-- FIN DEL SCRIPT
-- #############################################