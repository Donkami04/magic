const boom = require("@hapi/boom");

function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    // Verificar si el usuario es undefined o null
    if (!user) {
      return next(boom.unauthorized("Usuario no autenticado"));
    }

    // Verificar si el rol está en la lista de roles permitidos
    if (roles.includes(user.rol)) {
      next();
    } else {
      next(boom.unauthorized("Acceso no autorizado"));
    }
  };
}

module.exports = { checkRoles };
