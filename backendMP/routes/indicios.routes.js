const {Router} = require('express');
const controller = require('../controllers/indicios.controller');

const router = Router();
//registrar indicio
router.post("/", controller.crearIndicio);
//listar indicios por expediente
router.get("/:id", controller.listarIndiciosPorExpediente);

module.exports = router;
