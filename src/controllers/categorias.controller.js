const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

let categorias = [];

// --- Vistas y Formularios ---

const create = (req, res) => {
  res.render("categorias/create");
};

const index = (req, res) => {
  try {
    categorias = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../../categorias.json"), "utf-8")
    );
  } catch (error) {
    categorias = [];
  }
  res.render("categorias/index", { categorias });
};

const edit = (req, res) => {
  try {
    categorias = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../../categorias.json"), "utf-8")
    );
  } catch (error) {
    categorias = [];
  }

  const { id } = req.params;
  const categoria = categorias.find((categoria) => categoria.id == id);

  if (!categoria) {
    return res.status(404).send("No existe la categoria");
  }

  res.render("categorias/edit", { categoria });
};

// --- Lógica del CRUD (Crear, Actualizar, Borrar) ---

const store = async (req, res) => {
  const { nombre, email, password } = req.body;
  let categorias = [];

  try {
    const data = fs.readFileSync(
      path.resolve(__dirname, "../../categorias.json"),
      "utf-8"
    );
    categorias = JSON.parse(data);
  } catch (error) {
    console.log("El archivo de categorías no existe o está vacío. Creando uno nuevo.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const categoria = {
    id: Date.now(),
    nombre,
    email,
    password: hashedPassword,
  };

  categorias.push(categoria);

  fs.writeFileSync(
    path.resolve(__dirname, "../../categorias.json"),
    JSON.stringify(categorias, null, 2)
  );

  res.redirect("/categorias");
};

const update = (req, res) => {
  try {
    categorias = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../../categorias.json"), "utf-8")
    );
  } catch (error) {
    categorias = [];
  }

  const { id } = req.params;
  const { nombre, email } = req.body;
  const categoria = categorias.find((categoria) => categoria.id == id);

  if (!categoria) {
    return res.status(404).send("No existe la categoria");
  }

  categoria.nombre = nombre;
  categoria.email = email;

  fs.writeFileSync(
    path.resolve(__dirname, "../../categorias.json"),
    JSON.stringify(categorias, null, 2)
  );

  res.redirect("/categorias");
};

const destroy = (req, res) => {
  try {
    categorias = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, "../../categorias.json"), "utf-8")
    );
  } catch (error) {
    categorias = [];
  }

  const { id } = req.params;
  const index = categorias.findIndex((categoria) => categoria.id == id);

  if (index == -1) {
    return res.status(404).send("No existe la categoria");
  }

  categorias.splice(index, 1);

  fs.writeFileSync(
    path.resolve(__dirname, "../../categorias.json"),
    JSON.stringify(categorias, null, 2)
  );

  res.redirect("/categorias");
};

// --- Exportación de Funciones ---

module.exports = {
  create,
  store,
  index,
  edit,
  update,
  destroy,
};