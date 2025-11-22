const { Router } = require("express");
const controller = require("../controllers/indicios.controller");

const router = Router();

router.post("/", controller.crearIndicio);
router.get("/:id", controller.listarIndiciosPorExpediente);

module.exports = router;
