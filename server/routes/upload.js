const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const app = express();


const Usuario = require('../models/usuario');
const Producto = require('../models/productos');

// default options
app.use(fileUpload());

app.put('/upload/:tipo/:id', function(req, res) {

    let tipo = req.params.tipo;
    let id = req.params.id;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No files were uploaded.'
            }
        });
    };

    //validar tipo
    let tiposValidos = ['productos', 'usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            tipo: tipo,
            err: {
                message: 'las tipos permitidos son ' + tiposValidos
            }
        });
    }

    // El nombre del registro del archivo (i.e. "archivo") es usado para recoger la carga del fichero
    let archivo = req.files.archivo;
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];

    //extensiones permitidas
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];
    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            extension: extension,
            err: {
                message: 'las extensiones permitidas son ' + extensionesValidas
            }
        });
    }

    //modificacion nombre archivo
    let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`;

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (tipo === 'usuarios') {
            imagenUsuario(id, res, nombreArchivo);
        } else {
            imagenProducto(id, res, nombreArchivo);
        }


    });

});

function imagenUsuario(id, res, nombreArchivo) {
    let clave = 'usuarios';
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            borrarArchivo(nombreArchivo, clave);
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!usuarioDB) {
            borrarArchivo(nombreArchivo, clave);
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El usuario no exste'
                }
            });
        };

        borrarArchivo(usuarioDB.img, clave)

        usuarioDB.img = nombreArchivo;
        usuarioDB.save((err, usuarioGuardado) => {
            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            })
        });
    });
};

function imagenProducto(id, res, nombreArchivo) {
    let clave = 'productos';
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            borrarArchivo(nombreArchivo, clave);
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!productoDB) {
            borrarArchivo(nombreArchivo, clave);
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El producto no exste'
                }
            });
        };

        borrarArchivo(productoDB.img, clave)

        productoDB.img = nombreArchivo;
        productoDB.save((err, productoGuardado) => {
            res.json({
                ok: true,
                producto: productoGuardado,
                img: nombreArchivo
            })
        });
    });
};

function borrarArchivo(nombreImagen, tipo) {
    let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
};

module.exports = app;