const {Router} = require('express');
const controller = require('../controllers/expedientes.controller');

const router = Router();

router.get("/", controller.listarExpedientes);
router.post("/", controller.crearExpediente);
router.get("/:id", controller.obtenerExpediente);
router.post("/:id/aprobar", controller.aprobarExpediente);
router.post("/:id/rechazar", controller.rechazoExpediente);

module.exports = router;
