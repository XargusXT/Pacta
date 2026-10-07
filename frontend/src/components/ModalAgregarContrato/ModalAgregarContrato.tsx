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
            <label>Tipo de contrato:</label>
            <select>
                <option value=''>Como cliente</option>
                <option value=''>Como proveedor</option>
            </select>
            <label>Empresa relacionada:</label>
            <select>
                {lista_Empresas.map((empresa)=>(
                    <option
                    key={empresa.id}
                    value={empresa.nombre}
                    >{empresa.nombre}</option>
                ))}
            </select>
            <div>
                <label>Fecha de Inicio</label><input type='date'/><br/>
                <label>Fecha de Vigencia</label><input type='date'/><br/>
            </div>
            <label>Nombre de responsable de contrato:</label>
            <input></input>
            <label>Cargo del responsable de contrato:</label>
            <input></input>
            <button>Crear Contrato</button>
            <button onClick={()=>{
                cerrar(false)
            }}>Cancelar</button>
        </div>
    </div>
  )
}
