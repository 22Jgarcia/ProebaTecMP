const { Router } = require('express');
const controller = require('../controllers/expedientes.controller');
const  requireRole = require("../middleware/roles");

const router = Router();

router.get("/", controller.listarExpedientes);
router.post("/", requireRole(["coordinador"]), controller.crearExpediente);
router.get("/:id", controller.obtenerExpediente);

router.get("/:id/indicios", controller.listarIndiciosPorExpediente);

router.put("/:id/aprobar", requireRole(["coordinador"]), controller.aprobarExpediente);
router.put("/:id/rechazar", requireRole(["coordinador"]), controller.rechazarExpediente);

module.exports = router;
