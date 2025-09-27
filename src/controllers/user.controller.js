// Importamos el Modelo de Usuario.
const User = require("../models/User");

// Usaremos async/await para manejar las operaciones asíncronas con la Base de Datos.

const create = (req, res) => {
    // 1. Captura el mensaje de error y los datos viejos (si existen) de los query parameters
    const errorMessage = req.query.error;
    const oldName = req.query.name || ''; // Si no existe, es un string vacío
    const oldEmail = req.query.email || ''; 

    // 2. Pasa el error y los datos viejos a la vista
    res.render("usuarios/create", { 
        errorMessage: errorMessage,
        oldName: oldName,
        oldEmail: oldEmail
    }); 
};

const store = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // 1. Intenta crear el usuario en la BD. 
        await User.create(name, email, password);
        
        // Si tiene éxito, redirige a la lista
        res.redirect("/usuarios"); 

    } catch (error) {
        
        // 2. Comprobación del error de duplicado de MySQL
        if (error.code === 'ER_DUP_ENTRY') {
            
            // 3. Establece un mensaje de error para mostrar al usuario.
            const errorMessage = `El email "${email}" ya está registrado. Por favor, usa otro.`;
            
            // Si la duplicación fue en el campo 'email', redirige a la vista de creación con el error
            // IMPORTANTE: Aquí se usa un 'query parameter' para enviar el mensaje.
            return res.redirect(`/usuarios/create?error=${encodeURIComponent(errorMessage)}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`);
        }

        // Si es otro tipo de error (BD caída, sintaxis, etc.)
        console.error("Error al crear usuario:", error);
        return res.status(500).send("Error interno del servidor al crear usuario");
    }
};

const index = async (req, res) => {
    // Muestra el listado de todos los usuarios.
    try {
        // Obtenemos [rows, fields]. Desestructuramos para obtener solo 'rows'.
        const [usuarios] = await User.findAll(); 

        // Pasamos la lista de usuarios a la vista.
        res.render("usuarios/index", { usuarios: usuarios });
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return res.status(500).send("Error interno del servidor al listar usuarios");
    }
};

const show = async (req, res) => {
    // Muestra la información detallada de un usuario.
    const { id } = req.params;
    try {
        const [rows] = await User.findById(id);
        const usuario = rows[0]; // El primer elemento es el usuario

        if (!usuario) {
            return res.status(404).send("No existe el usuario");
        }
        res.render("usuarios/show", { usuario: usuario });
    } catch (error) {
        console.error("Error al mostrar usuario:", error);
        return res.status(500).send("Error interno del servidor");
    }
};

const edit = async (req, res) => {
    // Muestra el formulario para editar un usuario existente.
    const { id } = req.params;
    try {
        const [rows] = await User.findById(id);
        const usuario = rows[0];

        if (!usuario) {
            return res.status(404).send("No existe el usuario");
        }
        res.render("usuarios/edit", { usuario: usuario });
    } catch (error) {
        console.error("Error al cargar formulario de edición:", error);
        return res.status(500).send("Error interno del servidor");
    }
};

const update = async (req, res) => {
    // Actualiza el usuario en la base de datos.
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        await User.update(id, name, email, password); 
        console.log(`Usuario ID: ${id} actualizado`);
        res.redirect("/usuarios");
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        return res.status(500).send("Error interno del servidor al actualizar usuario");
    }
};

const destroy = async (req, res) => {
    // Elimina el usuario de la base de datos.
    const { id } = req.params;

    try {
        const [result] = await User.destroy(id);
        
        console.log(`Usuarios eliminados: ${result.affectedRows}`);
        res.redirect("/usuarios");
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        return res.status(500).send("Error interno del servidor al eliminar usuario");
    }
};

module.exports = {
    create,
    store,
    index,
    show,
    edit,
    update,
    destroy,
};