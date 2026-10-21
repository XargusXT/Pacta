const pool = require('../config/db');

const contratosController = {
    getAll: async (req, res) => {
        try {
            const query = 'SELECT * FROM public.tipos';
            const result = await pool.query(query);
            res.status(200).json({
                success:true,
                lista:result.rows
            }
            );
        } catch (error) {
            console.error('Error obteniendo tipos de contratos:', error);
            res.status(500).json({
                success:false,
                error: 'Error al obtener los tipos de contratos',
            });
        }
    },
    add:async (req,res)=>{
        try{
            const { denominacion, entidad, tipo, nca,ncontrato,valormn,valorgl,finicio,fvencimiento,observ } = req.body;
                // Validación
                if (!denominacion || !entidad || !tipo || !nca || !ncontrato || (!valormn && !valorgl) || !finicio || !fvencimiento || !observ) {
                    return res.status(400).json({
                        success:false,
                        error: 'Todos los campos son obligatorios'
                    });
                }
    
                
                const query = `
                    INSERT INTO public.contratos ( denominacion, entidad, tipo, nca,ncontrato,valormn,valorgl,finicio,fvencimiento,observ )
                    VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10)
                `;
                
                const result = await pool.query(query, [denominacion, entidad, tipo, nca,ncontrato,valormn,valorgl,finicio,fvencimiento,observ ]);
    
                res.status(201).json({
                    success:true
                });
        }catch(error){

        }
    }
};

module.exports = contratosController;