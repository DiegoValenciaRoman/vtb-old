//REQUIRE
const express = require('express');
const router = express.Router();
const { verificaAdmin_Role, verificaToken } = require('../midlewares/auth');

//REQUIRE CONTROLLERS
const productoCtrl = require('../controllers/producto');

const loginCtrl = require('../controllers/login');
const usuarioCtrl = require('../controllers/usuario');
const clienteCtrl = require('../controllers/cliente');

//============== MIDLEWARES ==============
verificaAdmin = [verificaToken, verificaAdmin_Role]

//=============== ROUTES ===================

//GET
router.get('/productos/:id', productoCtrl.getProducto);
router.get('/productos', productoCtrl.getProductos);
//PUT
router.put('/productos/:id', productoCtrl.actualizarProducto);
//POST
router.post('/productos', productoCtrl.crearProducto);
//DELETE
router.delete('/productos/:id', productoCtrl.eliminarProducto);


// POST
router.post('/usuarios', verificaAdmin,usuarioCtrl.crearUsuario);
router.post('/usuarios/login', loginCtrl.login);
// GET
router.get('/usuarios', verificaAdmin ,usuarioCtrl.getUsuarios);
router.get('/usuarios/:id', verificaAdmin, usuarioCtrl.getUsuario);
// PUT
router.put('/usuarios/:id', verificaAdmin, usuarioCtrl.actualizarUsuario);
// DELETE
router.delete('/usuarios/:id', verificaAdmin, usuarioCtrl.borrarUsuario);


// POST  
router.post('/clientes', verificaAdmin, clienteCtrl.crearCliente);
// GET
router.get('/clientes', verificaAdmin, clienteCtrl.getClientes);
router.get('/clientes/:id', verificaAdmin, clienteCtrl.getCliente);
// PUT
router.put('/clientes/:id', verificaAdmin, clienteCtrl.actualizarCliente);
// DELETE
router.delete('/clientes/:id', verificaAdmin, clienteCtrl.borrarCliente);


// EXPORT
module.exports = router;

