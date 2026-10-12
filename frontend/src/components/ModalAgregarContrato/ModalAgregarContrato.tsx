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
                    <label>Tipo de contrato:</label>
                    <select>
                        <option value=''>Como cliente</option>
                        <option value=''>Como proveedor</option>
                    </select>
                    <br />
                    <label>Empresa relacionada:</label>
                    <select>
                            {lista_Empresas.map((empresa)=>(
                                <option
                                key={empresa.id}
                                value={empresa.nombre}
                            >{empresa.nombre}</option>
                        ))}
                    </select>
                    <br/>
                    <label>Direccion:</label>
                    <input type="text" />
                    <br />
                    <label>Codigo REUP:</label>
                    <input type="text" />
                    <br />
                    <label>NIT:</label>
                    <input type="text" />
                    <br />
                    <label>Monto:</label>
                    <input type="number" />
                    <br />

                </section>
            
            <section>
                    <label>Fecha de Inicio</label><input type='date'/><br/>
                    <label>Fecha de Vigencia</label><input type='date'/><br/>
                    <label>Firmador del contrato:</label>
                    <input></input>
                    <label htmlFor=""><strong>Ficha de cliente</strong></label>
                    <label>Nombre:</label>
                    <input></input><br />
                    <label>Carnet de identidad:</label>
                    <input></input><br />
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
