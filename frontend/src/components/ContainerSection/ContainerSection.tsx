import React, { useState } from 'react';
import './ContainerSection.css';

import DashboardIcon from '@mui/icons-material/Dashboard';
import BusinessIcon from '@mui/icons-material/Business';
import EditIcon from '@mui/icons-material/Edit';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { Link } from 'react-router-dom';

interface ElementoLista {
    id: number;
    tipo: string;
    cantidad: number;
}

interface ElementoDato {
    id: number;
    definicion: string;
    concepto: string;
}

export default function ContainerSection() {
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

    const [listaDatosEmpresa] = useState<ElementoDato[]>([
        {
            id: 1,
            definicion: 'Nombre de la Empresa',
            concepto: 'N/A',
        },
        {
            id: 2,
            definicion: 'Nombre del encargado Jurídico',
            concepto: 'N/A',
        },
        {
            id: 3,
            definicion: 'Nombre del Director General',
            concepto: 'N/A',
        },
    ]);

    return (
        <main className="dashboard">

            {/* HEADER */}
            <header className="header">

                <div className="header-title">
                    <div className="header-icon">
                        <DashboardIcon />
                    </div>

                    <div>
                        <h2>Dashboard General</h2>
                        <p>Resumen general de la información de PACTA</p>
                    </div>
                </div>

                <div className="div-search">
                    <span className="search-icon">⌕</span>
                    <input
                        className="input-search"
                        type="text"
                        placeholder="Buscar contrato..."
                    />
                </div>

            </header>

            {/* ESTADÍSTICAS */}
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
                            <p className="tipo">{elemento.tipo}</p>
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

            {/* CONTENIDO PRINCIPAL */}
            <section className="informacion-div-flex-between">

                {/* DATOS DE EMPRESA */}
                <div className="white-space">

                    <div className="section-header">

                        <div className="section-title">
                            <div className="section-icon">
                                <BusinessIcon />
                            </div>

                            <div>
                                <h3>Datos de la empresa</h3>
                                <p>Información principal de la organización</p>
                            </div>
                        </div>

                        <button className="positive-button">
                            <EditIcon />
                            Editar
                        </button>

                    </div>

                    <div className="informacion-section">

                        <ul className="lista-datos">

                            {listaDatosEmpresa.map((elemento) => (
                                <li
                                    className="li-dato"
                                    key={elemento.id}
                                >
                                    <label>
                                        {elemento.definicion}
                                    </label>

                                    <input
                                        className="input-dato"
                                        placeholder={elemento.concepto}
                                    />
                                </li>
                            ))}

                        </ul>

                    </div>

                </div>

                {/* MODOS */}
                <div className="informacion-div-grid">

                    <div className="modo-editable">

                        <div className="modo-header">
                            <span className="modo-badge">
                                EDITABLE
                            </span>
                        </div>

                        <h3>Modo Editable</h3>

                        <p className="description-valor">
                            Permite modificar y administrar
                            la información de los contratos.
                        </p>

                        <Link
                            className="Link-modo"
                            to="/ModoEditor"
                        >
                            Activar Modo Editable
                            <ArrowForwardIcon />
                        </Link>

                        <small>
                            Solo Responsable Jurídico
                        </small>

                    </div>

                    <div className="modo-visible">

                        <div className="modo-header">
                            <span className="modo-badge">
                                VISUALIZACIÓN
                            </span>
                        </div>

                        <h3>Modo Visualización</h3>

                        <p className="description-valor">
                            Consulta la información de los
                            contratos sin realizar cambios.
                        </p>

                        <Link
                            className="Link-modo-visible"
                            to="/Registros"
                        >
                            Ver Contratos
                            <ArrowForwardIcon />
                        </Link>

                        <small>
                            Visualización de Contratos
                        </small>

                    </div>

                </div>

            </section>

        </main>
    );
}
