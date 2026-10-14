import React from 'react'
import '../../styles/Modal.css'
import {useState} from 'react'

interface Prop{
    cerrar:Function
}

interface Empresa{
    id:number,
    nombre:string
}

// tipo
// nombre de la empresa
// direccion
// codigo REUP
// monto
// nit

// fecha de firma
// fecha de vigencia


// contrato tiene:

// suplementos
// id

// firmador del contrato
// ficha de cliente:carnet de identidad y nombre de la persona

export default function ModalAgregarContrato({cerrar}:Prop) {
    const lista_Empresas:Empresa[]=[
        {id:1,nombre:'Alimatic'},
        {id:2,nombre:'Universales PR'},
        {id:3,nombre:'IPU Rafeal Ferro'},
        {id:4,nombre:'Empresa provincial de Farmacias y Opticas'},
        {id:5,nombre:'Estacion de Bomberos'},
        {id:6,nombre:'Estacion de Trenes'},
    ]
  return (
    <div className='fondo'>
        <div className='modal'>
            <div className='header-modal'>
            <h2>Crear contrato</h2>

                <button
            className='boton-cerrar'
            onClick={()=>{
                cerrar(false)
            }}>
                X
            </button>
            </div>

            <div className='flex-components'>
                <section>
                    <label>Denominacion:</label>
                    
                    <select>
                        <option value='cliente'>Cliente</option>
                        <option value='proveedor'>Proveedor</option>
                    </select>
                    <br />
                    <label>Entidad:</label>
                    <select>
                            {lista_Empresas.map((empresa)=>(
                                <option
                                key={empresa.id}
                                value={empresa.nombre}
                            >{empresa.nombre}</option>
                        ))}
                    </select>
                    <br/>
                    <label>tipo de contrato:</label>
                    <select name="" id="">

                    </select>
                    <br />
                    <label>No. de control del archivo:</label>
                    <input type="text" />
                    <br />
                    <label>N. contrato:</label>
                    <input type="text" />
                    <br />
                

                </section>
            
            <section>
                <label>Monto:</label>
                <input type="number" /><br />
                <div className='div-check'>
                    <label>Tipo de valor:</label><br />
                    <input type="checkbox" name="" id="" />Valor MN
                    <input type="checkbox" name="" id="" />Valor GL
                </div>
                <br />
                    <label>Fecha de Inicio</label><input type='date'/><br/>
                    <label>Fecha de Vencimiento</label><input type='date'/><br/>
                    <label>Observ:</label>
                    <input type='text'></input>
            </section> 
            </div>
            
            <button>Crear Contrato</button>
            <button onClick={()=>{
                cerrar(false)
            }}>Cancelar</button>
        </div>
    </div>
  )
}
