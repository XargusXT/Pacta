const pool = require('../config/db');

const authController = {
    loginJuridico: async (req, res) => {
        try {
            const { usuario, clave } = req.body;

            if (!clave || !usuario) {
                return res.status(400).json({ 
                    success:false,
                    message:'Usuario o clave vacio' 
                });
            }

            const result = await pool.query(
                'SELECT * FROM usuarios WHERE usuario = $1 AND rol = $2 ',
                [usuario,'juridico']
            );
            if (result.rows.length === 0) {
                return res.status(401).json({ 
                    success:false,
                    message: 'Usuario o clave incorrectas' 
                });
            }

            const user = result.rows[0];
            

            if (clave===user.clave) {
                return res.status(200).json({ 
                    success:true
                });
            }
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({ 
                success:false,
                message: 'Error de servidor'
            });
        }
    },
    loginAdmin: async (req, res) => {
        try {
            const { usuario, clave } = req.body;

            if (!clave || !usuario) {
                return res.status(400).json({ 
                    success:false,
                    message:'Usuario o clave vacio' 
                });
            }

            const result = await pool.query(
                'SELECT * FROM usuarios WHERE usuario = $1 AND rol = $2 ',
                [usuario,'administrador']
            );
            if (result.rows.length === 0) {
                return res.status(401).json({ 
                    success:false,
                    message: 'Usuario o clave incorrectas' 
                });
            }

            const user = result.rows[0];
            

            if (clave===user.clave) {
                return res.status(200).json({ 
                    success:true
                });
            }
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({ 
                success:false,
                message: 'Error de servidor'
            });
        }
    },
    
};

module.exports = authController;