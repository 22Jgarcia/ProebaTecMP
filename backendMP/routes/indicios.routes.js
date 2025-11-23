const { Router } = require("express");
const controller = require("../controllers/indicios.controller");

const router = Router();

router.post("/", controller.registrarIndicio);
// router.post("/", requireRole(["tecnico"]), controller.registrarIndicio);
router.get("/:id", controller.listarIndiciosPorExpediente);

module.exports = router;
