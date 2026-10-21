import React from 'react'
import '../../styles/Modal.css'
import '../../styles/ModoEditable.css'
import {useState,useEffect} from 'react'
import axios from 'axios'

interface Prop{
    cerrar:Function
}

interface Empresa{
    id:number,
    nombre:string
}

interface TipoContrato{
    id:number,
    nombre:string
}

interface ResponseEntidades{
    success:boolean,
    lista?:Empresa[],
    error?:string
}

interface ResponseTipos{
    success:boolean,
    lista?:TipoContrato[],
    error?:string
}

interface Contrato{
    denominacion:string,
    entidad:number,
    tipo:number,
    nca:string,
    ncontrato:string,
    valormn:boolean,
    valorgl:boolean,
    finicio:Date,
    fvencimiento:Date,
    observ:string
}

interface ReponseAddContrato{
    success:boolean,
    error?:string
}


export default function ModalAgregarContrato({cerrar}:Prop) {
    const [lista_Empresas,setlista_Empresa]=useState<Empresa[]>([])
    const [lista_tipos_contratos,setlista_tipos_contratos]=useState<TipoContrato[]>([])

    const [denominacion,setDenominacion]=useState<String>('Cliente');
    const [entidad,setEntidad]=useState<Number>(0);
    const [tipo,setTipo]=useState<Number>(0);
    const [nca,setNca]=useState<String>('');
    const [ncontrato,setNcontrato]=useState<String>('');
    const [valormn,setValormn]=useState<Boolean>(false);
    const [valorgl,setValorgl]=useState<Boolean>(false);
    const [finicio,setFinicio]=useState<Date>();
    const [fvencimiento,setFvencimiento]=useState<Date>();
    const [observ,setObserv]=useState<String>();

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

        const HandleTypes=async ()=>{
            try{
                const response=await axios.post<ResponseTipos>('/api/contratos/tipos')
                const data=await response.data
                if(data.success){
                    setlista_tipos_contratos(data.lista)
                }
            }catch(error){
                alert(error)
            }
        }

        HandleEntitys()
        HandleTypes()
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
                    
                    <select className="input-dato" onChange={(e)=>{
                        console.log(e.target.value)
                        setDenominacion(e.target.value)
                    }} className='select'>
                        <option value='cliente'>Cliente</option>
                        <option value='proveedor'>Proveedor</option>
                    </select>
                    <br />
                    <label>Entidad:</label>
                    <select onChange={(e)=>{
                        setEntidad(e.target.value)
                    }} className='select'>
                            {lista_Empresas.map((empresa)=>(
                                <option
                                key={empresa.id}
                                value={empresa.id}
                            >{empresa.nombre}</option>
                        ))}
                    </select>
                    <br/>
                    <label>tipo de contrato:</label>
                    <select className='select' onChange={(e)=>{
                        setTipo(e.target.value)
                    }} name="" id="">
                        {lista_tipos_contratos.map((tipo)=>(
                                <option
                                key={tipo.id}
                                value={tipo.id}
                            >{tipo.nombre}</option>
                        ))}
                    </select>
                    <br />
                    <label>No. de control del archivo:</label>
                    <input className="input-dato" type="text" onChange={(e)=>{
                        setNca(e.target.value)
                    }} />
                    <br />
                    <label>N. contrato:</label>
                    <input className="input-dato" type="text" onChange={(e)=>{
                        setNcontrato(e.target.value)
                    }} />
                    <br />
                

                </section>
            
            <section>
                <label>Tipo de valor:</label><br />
                <div className='div-check'>
                    
                    <input className="radio-dato" onClick={()=>{
                        setValormn(true)
                        setValorgl(false)
                    }} type="radio" name="valor" id="" /><label>Valor MN</label><br />
                    <input className="radio-dato" onClick={()=>{
                        setValormn(false)
                        setValorgl(true)
                    }} type="radio" name="valor" id="" /><label>Valor GL</label>
                </div>
                <br />
                    <label>Fecha de Inicio</label><input onChange={(e)=>{
                        setFinicio(e.target.value)
                    }} type='date'/><br/>
                    <label>Fecha de Vencimiento</label><input onChange={(e)=>{
                        setFvencimiento(e.target.value)
                    }} type='date'/><br/>
                    <label>Observ:</label>
                    <input className="input-dato" type='text' onChange={(e)=>{
                        setObserv(e.target.value)
                    }}></input>
            </section> 
            </div>
            
            <button className='positive-button' onClick={async (e)=>{
                
                try{
                    e.preventDefault()
                    const contrato:Contrato={
                        denominacion:denominacion,
                        entidad:entidad,
                        tipo:tipo,
                        nca:nca,
                        ncontrato:ncontrato,
                        valormn:valormn,
                        valorgl:valorgl,
                        finicio:finicio,
                        fvencimiento:fvencimiento,
                        observ:observ
                    }
                    console.log(contrato)
                    console.log('enviando contrato nuevo...')
                    const response=await axios.post<ReponseAddContrato>('/api/contratos/agregar',contrato)
                    console.log('contrato recibido')
                    console.log(response.data)
                    const data=await response.data
                    if(data.success){
                        cerrar(false)
                    }else{
                        alert(data.error)
                    }


                }catch(error){

                }
            }}>Crear Contrato</button>
            <button className='Link-modo' onClick={()=>{
                cerrar(false)
            }}>Cancelar</button>
        </div>
    </div>
  )
}
