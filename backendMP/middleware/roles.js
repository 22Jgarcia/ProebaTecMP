function requireRole(rolesPermitidos = []) {

  return (req, res, next) => { 
    const rol = req.headers["rol"]; 

    if (!rol) {
      console.warn("No se envió rol en la petición");
      return res.status(401).json({ error: "Rol no enviado en headers" });
    }

    if (!rolesPermitidos.includes(rol)) {
      console.warn(`Acceso denegado para rol: ${rol}`);
      return res.status(403).json({ error: "Acceso denegado: rol no autorizado" });
    }

    next();
  };
}

module.exports = requireRole;