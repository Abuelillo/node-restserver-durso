var jwt = require('jsonwebtoken');

/**
 * Verifica Token
 */
let verificaToken = (req, res, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: { message: 'Token no valido' }
            });
        };

        req.usuario = decoded.usuario;
        next();
    });

    console.log(token);

};


/**
 * Verifica admin Role
 */
let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role != 'ADMIN_ROLE') {
        return res.json({
            ok: false,
            err: 'El usuario no es administrador'
        });
    } else {
        next();
    };


};

module.exports = {
    verificaToken,
    verificaAdmin_Role
}