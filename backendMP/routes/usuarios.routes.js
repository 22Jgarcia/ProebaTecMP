const { Router } = require("express");
const controller = require("../controllers/usuarios.controller");

const router = Router();

router.get("/", controller.listarUsuarios);
router.post("/login", controller.login);
// router.get("/roles", controller.listarRoles);

module.exports = router;
