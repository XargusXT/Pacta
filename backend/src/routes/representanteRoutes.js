const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { verifyToken } = require('../middlewares/authMiddleware');
const { uploadDocumento, desecharDocumento } = require('../controllers/representanteController');
const { descargarDocumento } = require('../controllers/documentosController');

// POST /api/documentos/upload
router.post('/upload', verifyToken, async (req, res) => {
  try {
    // Llamar al controller original
    const result = await new Promise((resolve, reject) => {
      // Simulamos el comportamiento del controller pero capturamos el resultado
      // Si tu uploadDocumento ya maneja la respuesta, necesitaré ver ese controller
      // Por ahora asumimos que inserta en BD y devuelve datos
      uploadDocumento(req, res, (err) => {
        if (err) reject(err);
        else resolve(req.documentoInsertado); // Ajusta según tu controller
      });
    });

    // 🔥 EMITIR EVENTO A TODOS LOS CLIENTES
    req.io.emit('documento:creado', result);

    res.status(201).json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error al subir documento' });
  }
});

// POST /api/documentos/desechar
router.post('/desechar', verifyToken, async (req, res) => {
  try {
    const { nombreDocumento } = req.body;

    if (!nombreDocumento) {
      return res.status(400).json({ message: 'nombreDocumento es requerido' });
    }

    // 1. Buscar el documento por nombre
    const docResult = await pool.query(
      'SELECT * FROM documentos WHERE nombre_documento = $1',
      [nombreDocumento]
    );

    if (docResult.rows.length === 0) {
      return res.status(404).json({ message: 'Documento no encontrado' });
    }

    const docData = docResult.rows[0];

    // 2. Guardar en papelera
    await pool.query(
      'INSERT INTO papelera (id_documento, nombre_documento, id_seccion, documento) VALUES ($1, $2, $3, $4)',
      [docData.id_documento, docData.nombre_documento, docData.id_seccion, docData.documento]
    );

    // 3. Eliminar de documentos
    await pool.query('DELETE FROM documentos WHERE id_documento = $1', [docData.id_documento]);

    // 4. Emitir evento
    req.io.emit('documento:desechado', { 
      id: docData.id_documento,
      nombre_documento: docData.nombre_documento,
      id_seccion: docData.id_seccion
    });

    res.json({ success: true, message: 'Documento desechado correctamente' });

  } catch (error) {
    console.error('Error desechando documento:', error);
    res.status(500).json({ message: 'Error al desechar el documento' });
  }
});

// GET /api/documentos/seccion/:id
router.get('/seccion/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT id_documento, id_seccion, nombre_documento FROM documentos WHERE id_seccion = $1 ORDER BY nombre_documento',
      [id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error al obtener documentos' });
  }
});

// GET /api/documentos/:id/descargar
router.get('/:id/descargar', verifyToken, descargarDocumento);

// PUT /api/documentos/:id/trash
router.put('/:id/trash', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const doc = await pool.query('SELECT * FROM documentos WHERE id_documento = $1', [id]);
    if (!doc.rows[0]) return res.status(404).json({ message: 'Documento no encontrado' });

    // Guardar en papelera antes de eliminar
    const docData = doc.rows[0];
    
    await pool.query(
      'INSERT INTO papelera (id_documento, nombre_documento, id_seccion, documento) VALUES ($1, $2, $3, $4)',
      [docData.id_documento, docData.nombre_documento, docData.id_seccion, docData.documento]
    );

    await pool.query('DELETE FROM documentos WHERE id_documento = $1', [id]);

    // 🔥 EMITIR EVENTO DE ELIMINACIÓN
    req.io.emit('documento:eliminado', { 
      id: id,
      id_seccion: docData.id_seccion 
    });

    res.json({ success: true, id: id });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error al mover a papelera' });
  }
});

module.exports = router;