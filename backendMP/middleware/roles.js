function requireRole(rolesPermitidos = []) {
  return (req, res, next) => {
    const rol = req.headers["rol"];

    if (!rol) {
      return res.status(401).json({ error: "Rol no enviado en headers" });
    }
    if (!rolesPermitidos.includes(rol)) {
      return res.status(403).json({ error: "Acceso denegado: rol no autorizado" });
    }

    next();
  };
}

module.exports = requireRole;
