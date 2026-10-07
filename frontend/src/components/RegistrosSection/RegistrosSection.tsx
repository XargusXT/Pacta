import React, { useState } from 'react';
import './Registros.css';
import ModalAgregarContrato from '../ModalAgregarContrato/ModalAgregarContrato';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Contrato {
    id: number;
    nombre: string;
    tipo: 'Comprador' | 'Proveedor';
    encargado: string;
    suplementos: string;
    fechaInicio: string;
    fechaVencimiento: string;
    estado: 'Activo' | 'Por vencer' | 'Vencido';
}

interface ElementoLista {
    id: number;
    tipo: string;
    cantidad: number;
}

export default function Registros() {
    const [activeAgregarModal,setActiveAgregarModal]=useState<boolean>(false)

    const [listaInformacion] = useState<ElementoLista[]>([
        {
            id: 1,
            tipo: 'Cantidad de contratos',
            cantidad: 20,
        },
        {
            id: 2,
            tipo: 'Contratos / Proveedor',
            cantidad: 15,
        },
        {
            id: 3,
            tipo: 'Contratos / Cliente',
            cantidad: 5,
        },
    ]);

    const [contratos] = useState<Contrato[]>([
        {
            id: 1,
            nombre: 'Contrato de suministro de alimentos',
            tipo: 'Proveedor',
            encargado: 'Carlos Rodríguez',
            suplementos: 'Productos alimenticios',
            fechaInicio: '12/01/2026',
            fechaVencimiento: '12/01/2027',
            estado: 'Activo',
        },
        {
            id: 2,
            nombre: 'Contrato de adquisición de materias primas',
            tipo: 'Comprador',
            encargado: 'María González',
            suplementos: 'Materias primas',
            fechaInicio: '05/02/2026',
            fechaVencimiento: '05/12/2026',
            estado: 'Por vencer',
        },
        {
            id: 3,
            nombre: 'Contrato de distribución comercial',
            tipo: 'Proveedor',
            encargado: 'Jorge Pérez',
            suplementos: 'Productos terminados',
            fechaInicio: '20/03/2026',
            fechaVencimiento: '20/03/2027',
            estado: 'Activo',
        },
        {
            id: 4,
            nombre: 'Contrato de compra de equipamiento',
            tipo: 'Comprador',
            encargado: 'Ana Martínez',
            suplementos: 'Equipos tecnológicos',
            fechaInicio: '10/01/2025',
            fechaVencimiento: '10/09/2026',
            estado: 'Vencido',
        },
        {
            id: 5,
            nombre: 'Contrato de suministro industrial',
            tipo: 'Proveedor',
            encargado: 'Luis Hernández',
            suplementos: 'Suministros industriales',
            fechaInicio: '15/04/2026',
            fechaVencimiento: '15/04/2027',
            estado: 'Activo',
        },
    ]);

    return (
        <main className="dashboard registros-page">

            {/* =========================
                HEADER
            ========================= */}

            <header className="header">

                <div className="header-title">

                    <div className="header-icon">
                        <DashboardIcon />
                    </div>

                    <div>
                        <h2>Registros</h2>

                        <p>
                            Visibilidad acerca de los contratos disponibles
                        </p>
                    </div>

                </div>

                <div className="div-search">

                    <SearchIcon className="search-icon" />

                    <input
                        className="input-search"
                        type="text"
                        placeholder="Buscar contrato..."
                    />

                </div>

            </header>

            {/* =========================
                ESTADÍSTICAS
            ========================= */}

            <section className="informacion-div-flex">

                {listaInformacion.map((elemento) => (

                    <article
                        className={
                            elemento.tipo === 'Cantidad de contratos'
                                ? 'casilla-negra'
                                : 'casilla-blanca'
                        }
                        key={elemento.id}
                    >

                        <div className="card-top">

                            <p className="tipo">
                                {elemento.tipo}
                            </p>

                        </div>

                        <p className="cantidad">
                            {elemento.cantidad}
                        </p>

                        <div className="card-footer">

                            <span>
                                Disponibles en Ventas
                            </span>

                            <ArrowForwardIcon />

                        </div>

                    </article>

                ))}

            </section>

            {/* =========================
                CONTRATOS
            ========================= */}

            <section className="contratos-section">

                <div className="contratos-header">

                    <div>

                        <h3>
                            Contratos registrados
                        </h3>

                        <p>
                            Consulta y administra los contratos disponibles
                        </p>

                    </div>
                    {activeAgregarModal && 
                    (<ModalAgregarContrato
                    cerrar={setActiveAgregarModal}
                    />)}

                    <button className="agregar-contrato"
                    onClick={()=>{
                        setActiveAgregarModal(!activeAgregarModal)
                    }}
                    >

                        <AddIcon />

                        Agregar contrato

                    </button>

                </div>

                {/* =========================
                    LISTA DE CONTRATOS
                ========================= */}

                <div className="lista-contratos">

                    {contratos.map((contrato) => (

                        <article
                            className="contrato-card"
                            key={contrato.id}
                        >

                            {/* CABECERA */}

                            <div className="contrato-card-header">

                                <div className="contrato-identidad">

                                    <div className="contrato-icon">
                                        <BusinessIcon />
                                    </div>

                                    <div>

                                        <h4>
                                            {contrato.nombre}
                                        </h4>

                                        <span
                                            className={
                                                contrato.tipo === 'Proveedor'
                                                    ? 'tipo-contrato proveedor'
                                                    : 'tipo-contrato comprador'
                                            }
                                        >
                                            {contrato.tipo}
                                        </span>

                                    </div>

                                </div>

                                <span
                                    className={`estado-contrato ${contrato.estado
                                        .toLowerCase()
                                        .replace(' ', '-')}`}
                                >
                                    {contrato.estado}
                                </span>

                            </div>

                            {/* INFORMACIÓN */}

                            <div className="contrato-info">

                                <div className="contrato-dato">
                                    <div>
                                        <span>
                                            Encargado de compra
                                        </span>

                                        <strong>
                                            {contrato.encargado}
                                        </strong>
                                    </div>

                                </div>

                                <div className="contrato-dato">

                                    <Inventory2OutlinedIcon />

                                    <div>
                                        <span>
                                            Suplementos
                                        </span>

                                        <strong>
                                            {contrato.suplementos}
                                        </strong>
                                    </div>

                                </div>

                                <div className="contrato-dato">

                                    <CalendarTodayIcon />

                                    <div>
                                        <span>
                                            Fecha de inicio
                                        </span>

                                        <strong>
                                            {contrato.fechaInicio}
                                        </strong>
                                    </div>

                                </div>

                                <div className="contrato-dato">

                                    <CalendarTodayIcon />

                                    <div>
                                        <span>
                                            Fecha de vencimiento
                                        </span>

                                        <strong>
                                            {contrato.fechaVencimiento}
                                        </strong>
                                    </div>

                                </div>

                            </div>

                        </article>

                    ))}

                </div>

            </section>

        </main>
    );
}