const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

// GET /usuarios
router.get("/", userController.index); 
// GET /usuarios/crear
router.get("/create", userController.create); 
// POST /usuarios
router.post("/", userController.store); 
// GET /usuarios/:id
router.get("/:id", userController.show); 
// GET /usuarios/:id/edit
router.get("/:id/edit", userController.edit); 
// PUT /usuarios/:id (Usamos method-override para simular PUT)
router.put("/:id", userController.update); 
// DELETE /usuarios/:id (Usamos method-override para simular DELETE)
router.delete("/:id", userController.destroy); 

module.exports = router;