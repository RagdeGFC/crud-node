const model = require("../models/Category");

const create = (req, res) => {
  res.render("categorias/create");
};

const store = (req, res) => {
  // Se agregan los nuevos campos a la desestructuración de req.body
  const { name, email, password } = req.body;

  // Se pasan los nuevos campos a la función create del modelo
  model.create(name, email, password, (error, id) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }

    console.log(id);

    res.redirect("/categorias");
  });
};

const index = (req, res) => {
  model.findAll((error, categorias) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }

    res.render("categorias/index", { categorias });
  });
};

const show = (req, res) => {
  const { id } = req.params;

  model.findById(id, (error, categoria) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }

    if (!categoria) {
      return res.status(404).send("No existe la categoría");
    }

    res.render("categorias/show", { categoria });
  });
};

const edit = (req, res) => {
  const { id } = req.params;

  model.findById(id, (error, categoria) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }

    if (!categoria) {
      return res.status(404).send("No existe la categoría");
    }

    res.render("categorias/edit", { categoria });
  });
};

const update = (req, res) => {
  const { id } = req.params;
  // Se agregan los nuevos campos a la desestructuración de req.body
  const { name, email, password } = req.body;

  // Se pasan los nuevos campos a la función update del modelo
  model.update(id, name, email, password, (error, changes) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }

    console.log(changes);

    res.redirect("/categorias");
  });
};

const destroy = (req, res) => {
  const { id } = req.params;

  model.destroy(id, (error, changes) => {
    if (error) {
      return res.status(500).send("Internal Server Error");
    }

    console.log(changes);

    res.redirect("/categorias");
  });
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