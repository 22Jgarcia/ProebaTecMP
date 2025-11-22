const { Router } = require('express');
const controller = require('../controllers/expedientes.controller');

const router = Router();

router.get("/", controller.listarExpedientes);
router.post("/", controller.crearExpediente);
router.get("/:id", controller.obtenerExpediente);

router.get("/:id/indicios", controller.listarIndiciosPorExpediente);

router.put("/:id/aprobar", controller.aprobarExpediente);
router.put("/:id/rechazar", controller.rechazarExpediente);

module.exports = router;
