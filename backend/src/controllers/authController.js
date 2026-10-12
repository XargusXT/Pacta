const pool = require('../config/db');

const authController = {
    login: async (req, res) => {
        try {
            const { usuario, clave } = req.body;

            if (!clave || !usuario) {
                return res.status(400).json({ 
                    message: false 
                });
            }

            const result = await pool.query(
                'SELECT * FROM juridico WHERE nombre = $1',
                [usuario]
            );

            if (result.rows.length === 0) {
                return res.status(401).json({ 
                    message: false 
                });
            }

            const user = result.rows[0];
            

            if (clave===user.password) {
                return res.status(200).json({ 
                    message:true
                });
            }
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({ 
                message: false
            });
        }
    }
};

module.exports = authController;