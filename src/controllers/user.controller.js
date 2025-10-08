// Importamos el Modelo de Usuario.
const User = require("../models/User");

// Usaremos async/await para manejar las operaciones asíncronas con la Base de Datos.

// ########################################################
// Métodos para RENDERIZAR VISTAS (GET)
// ########################################################

const create = (req, res) => {
    // MÉTODO: GET
    // RENDER: Muestra el formulario de creación.
    const errorMessage = req.query.error;
    const oldName = req.query.name || ''; 
    const oldEmail = req.query.email || ''; 

    res.render("usuarios/create", { 
        errorMessage: errorMessage,
        oldName: oldName,
        oldEmail: oldEmail
    }); 
};

const index = async (req, res) => {
    // MÉTODO: GET
    // RENDER: Muestra el listado de todos los usuarios.
    try {
        // El Modelo devuelve el array de usuarios directo.
        const usuarios = await User.findAll(); 

        res.render("usuarios/index", { usuarios: usuarios });
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return res.status(500).send("Error interno del servidor al listar usuarios");
    }
};

const show = async (req, res) => {
    // MÉTODO: GET
    // RENDER: Muestra la información detallada de un usuario.
    const { id } = req.params;
    try {
        // El Modelo devuelve el objeto usuario directo.
        const usuario = await User.findById(id); 

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
    // MÉTODO: GET
    // RENDER: Muestra el formulario para editar un usuario existente.
    const { id } = req.params;
    try {
        // El Modelo devuelve el objeto usuario directo.
        const usuario = await User.findById(id);

        if (!usuario) {
            return res.status(404).send("No existe el usuario");
        }
        res.render("usuarios/edit", { usuario: usuario });
    } catch (error) {
        console.error("Error al cargar formulario de edición:", error);
        return res.status(500).send("Error interno del servidor");
    }
};

// ########################################################
// Métodos para PROCESAR DATOS (POST/PUT/DELETE)
// ########################################################

const store = async (req, res) => {
    // MÉTODO: POST
    // PROCESO: Crea un nuevo usuario en la base de datos usando el Stored Procedure.
    const { name, email, password } = req.body;

    try {
        await User.create(name, email, password);
        res.redirect("/usuarios"); 

    } catch (error) {
        
        // Comprobación del error de duplicado de MySQL (código 1062 es ER_DUP_ENTRY)
        if (error.errno === 1062) { 
            const errorMessage = `El email "${email}" ya está registrado. Por favor, usa otro.`;
            return res.redirect(`/usuarios/create?error=${encodeURIComponent(errorMessage)}&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`);
        }

        console.error("Error al crear usuario:", error);
        return res.status(500).send("Error interno del servidor al crear usuario");
    }
};

const update = async (req, res) => {
    // MÉTODO: PUT (o POST simulado)
    // PROCESO: Actualiza el usuario en la base de datos usando el Stored Procedure.
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
    // MÉTODO: DELETE (o POST simulado)
    // PROCESO: Elimina el usuario de la base de datos usando el Stored Procedure.
    const { id } = req.params;

    try {
        // El Modelo devuelve el objeto con el conteo de filas afectadas.
        const [result] = await User.destroy(id);
        
        // Accedemos al resultado correcto del SP de eliminación
        const affectedRows = result[0].affected_rows;
        
        console.log(`Usuarios eliminados: ${affectedRows}`);
        res.redirect("/usuarios");
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        return res.status(500).send("Error interno del servidor al eliminar usuario");
    }
};

// ########################################################
// EXPORTACIÓN DE MÉTODOS
// ########################################################

module.exports = {
    create,
    store,
    index,
    show,
    edit,
    update,
    destroy,
};