
// REQUIRE MODELS
let Producto = require('../models/producto');

// Funciones

let getProductos = function (err, res) {

  Producto.find()
    .exec((err, productosDB) => {

      if (err) {
        return res.status(500).json({
          ok: false,
          err: {
            message: 'Error al obtener los productos desde la base de datos',
            err:err
          }
        });
      }

      if (!productosDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'No se han obtenido productos'
          }
        });
      }
      res.json({
        ok: true,
        productos: productosDB
      })

    })
}

let getProducto = function (req, res){
  
  let id = req.params.id;

  Producto.findById(id)
    .exec((err, productoDB) => {
      
      if (err) {
        return res.status(500).json({
          ok: false,
          err:err
        });
      }

      if (!productoDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'Producto no existe'
          }
        });
      }

      res.json({
        ok: true,
        producto: productoDB
      })

    })
}

let actualizarProducto = function (req, res) {
  
  let id = req.params.id;
  let body = req.body;

  Producto.findById(id, (err, productoDB) => {
    
    if (err) {
      return res.status(500).json({
        ok: false,
        err:err
      });
    }
  
    if (!productoDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'El producto no existe'
        }
      });
    }

    productoDB.nombre = body.nombre;
    productoDB.precio = body.precio;
  
    productoDB.save((err, prodActualizado) => {
      
      if (err) {
        return res.status(500).json({
          ok: false,
          err:err
        });
      }
  
      res.json({
        ok: true,
        producto: prodActualizado
      })
  
    });

  });
       

}


let crearProducto = function (req, res) {
  let body = req.body;

  let producto = new Producto({
    nombre: body.nombre,
    precio: body.precio
  });
  console.log(body);
  producto.save((err, productoDB) => {
    
    if (err) {
      return res.status(500).json({
        ok: false,
        err:{
          message: 'Error al guardar el producto',
          err:err
        }
      });
    }

    if (!productoDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'No se ha guardado el producto'
        }
      });
    }

    res.status(201).json({
      ok: true,
      producto: productoDB
    });

  });
  
}

let eliminarProducto = function (req, res) {
  
  let id = req.params.id;

  Producto.findByIdAndRemove(id, (err, prodEliminado) => {
    
    if (err) {
      return res.status(500).json({
        ok: false,
        err:err
      });
    }

    if (!prodEliminado) {
      return res.status(400).json({
        ok: false,
        err: {
          messagge: 'El producto no existe'
        }
      });
    }

    res.json({
      ok: true,
      message: 'Producto eliminado',
      producto: prodEliminado
    });

  });

}


module.exports = {
  getProducto,
  getProductos,
  actualizarProducto,
  crearProducto,
  eliminarProducto
}
