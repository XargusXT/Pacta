import React from 'react';
import './Menu.css';

import { Link, useLocation } from 'react-router-dom';

import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SettingsIcon from '@mui/icons-material/Settings';

interface ElementoLista {
    id: number;
    elementolista: string;
    path: string;
    icon: React.ReactNode;
}

export default function Menu() {

    const location = useLocation();

    const lista: ElementoLista[] = [
        {
            id: 1,
            elementolista: 'Dashboard',
            path: '/',
            icon: <DashboardIcon />,
        },
        {
            id: 2,
            elementolista: 'Registros',
            path: '/Registros',
            icon: <DescriptionIcon />,
        },
        {
            id: 3,
            elementolista: 'Modo Editor',
            path: '/ModoEditor',
            icon: <EditNoteIcon />,
        },
    ];

    return (
        <aside className="menu">

            {/* LOGO / NOMBRE */}
            <div className="menu-brand">
                <div className="brand-logo">
                    P
                </div>

                <div>
                    <h2>PACTA</h2>
                    <span>Gestión de contratos</span>
                </div>
            </div>

            {/* NAVEGACIÓN */}
            <nav>

                <p className="menu-label">
                    MENÚ PRINCIPAL
                </p>

                <ul className="lista-menu">

                    {lista.map((elemento) => {

                        const activo =
                            location.pathname === elemento.path;

                        return (
                            <li
                                className={
                                    activo
                                        ? 'elemento-lista-menu activo'
                                        : 'elemento-lista-menu'
                                }
                                key={elemento.id}
                            >
                                <Link
                                    className="link-menu"
                                    to={elemento.path}
                                >
                                    <span className="menu-item-icon">
                                        {elemento.icon}
                                    </span>

                                    <span>
                                        {elemento.elementolista}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}

                </ul>

            </nav>

            {/* PARTE INFERIOR */}
            <div className="bottom-div-menu">

                <Link
                    className={
                        location.pathname === '/Settings'
                            ? 'settings-link activo'
                            : 'settings-link'
                    }
                    to="/Settings"
                >
                    <SettingsIcon />
                    <span>Configuración</span>
                </Link>

                <div className="menu-divider" />

                <cite>
                    © 2026 Alimatic
                    <br />
                    Todos los derechos reservados
                </cite>

            </div>

        </aside>
    );
}