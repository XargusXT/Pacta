const pool = require('../config/db');

// Descargar documento
const descargarDocumento = async (req, res) => {
    try {
        const { id } = req.params;
        const userSection = req.user?.id_seccion;
        const isAdmin = req.user?.es_admin || false;

        // Obtener documento
        const query = 'SELECT id_documento, id_seccion, nombre_documento, documento FROM documentos WHERE id_documento = $1';
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }

        const doc = result.rows[0];

        // Configurar headers para descarga
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename="${doc.nombre_documento}"`);
        
        // Enviar el buffer
        res.send(doc.documento);

    } catch (error) {
        console.error('Error al descargar documento:', error);
        res.status(500).json({ error: 'Error al descargar el documento' });
    }
};

module.exports = {
    descargarDocumento
};