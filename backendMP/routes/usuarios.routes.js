const { Router } = require("express");
const controller = require("../controllers/usuarios.controller");

const router = Router();

router.get("/", controller.listarUsuarios);
router.post("/login", controller.login);

module.exports = router;
