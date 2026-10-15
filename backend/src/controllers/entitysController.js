const pool = require('../config/db');

const entitysController = {
    getAll: async (req, res) => {
        try {
            const query = 'SELECT id, nombre FROM public.entidades';
            const result = await pool.query(query);
            
            res.status(200).json({
                success:true,
                lista:result.rows
            }
            );
        } catch (error) {
            console.error('Error obteniendo secciones:', error);
            res.status(500).json({
                success:false,
                error: 'Error al obtener las secciones',
            });
        }
    }
};

module.exports = entitysController;