import React from 'react'
import '../../styles/Modal.css'
import {useState,useEffect} from 'react'
import axios from 'axios'

interface Prop{
    cerrar:Function
}

interface Empresa{
    id:number,
    nombre:string
}

interface ResponseEntidades{
    success:boolean,
    lista?:Empresa[],
    error?:string
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
    const [lista_Empresas,setlista_Empresa]=useState<Empresa[]>([])

    useEffect(()=>{
        const HandleEntitys=async ()=>{
            try {
            const response =await axios.get<ResponseEntidades>('/api/entitys')
            const data=await response.data
            if(data.success){
                setlista_Empresa(data.lista)
            }
        } catch (error) {
            alert(error)
        }
        }

        HandleEntitys()
    },[])
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
                    
                    <select className='select'>
                        <option value='cliente'>Cliente</option>
                        <option value='proveedor'>Proveedor</option>
                    </select>
                    <br />
                    <label>Entidad:</label>
                    <select className='select'>
                            {lista_Empresas.map((empresa)=>(
                                <option
                                key={empresa.id}
                                value={empresa.nombre}
                            >{empresa.nombre}</option>
                        ))}
                    </select>
                    <br/>
                    <label>tipo de contrato:</label>
                    <select className='select' name="" id="">

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
