const { Router } = require("express");
const controller = require('../controllers/reportes.controller');
const  requireRole = require("../middleware/roles");

const router = Router();

router.get("/", requireRole(["coordinador"]), controller.listarReportes);
router.get("/estados", requireRole(["coordinador"]), controller.reportePorEstado);
router.get("/filtro", requireRole(["coordinador"]), controller.reporteFiltro);
router.get("/detallado", requireRole(["coordinador"]), controller.reporteDetallado);

module.exports = router;
