import React, { useState } from 'react';
import '../styles/ModoEditable.css';

import { Link } from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginIcon from '@mui/icons-material/Login';

import logo from '../assets/image.png';

export default function ModoEditable() {

    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Aquí posteriormente conectaremos
        // la autenticación con el backend.
        console.log({
            usuario,
            clave,
        });
    };

    return (
        <main className="Login">

            {/* PANEL IZQUIERDO */}
            <section className="izquierdo">

                <div className="welcome-content">

                    <div className="logo-container">
                        <img
                            src={logo}
                            alt="PACTA"
                            className="logo-modo"
                        />
                    </div>

                    <h1>Bienvenido</h1>

                    <p>
                        Accede al modo editable de PACTA
                        para gestionar los contratos.
                    </p>

                </div>

                <div className="bottom-div">

                    <h3>Modo Editable</h3>

                    <p>
                        Todos los derechos reservados
                        © Copyright 2026
                    </p>

                </div>

            </section>

            {/* PANEL DERECHO */}
            <section className="derecho">

                <div className="formulario">

                    <div className="form-icon">
                        <LockOutlinedIcon />
                    </div>

                    <h2>Acceso al modo editable</h2>

                    <p className="form-description">
                        Introduce tus credenciales para
                        continuar.
                    </p>

                    <form onSubmit={handleSubmit}>

                        <div className="input-group">

                            <label htmlFor="usuario">
                                Usuario
                            </label>

                            <input
                                id="usuario"
                                className="input-dato"
                                type="text"
                                placeholder="Escribe tu usuario"
                                value={usuario}
                                onChange={(event) =>
                                    setUsuario(event.target.value)
                                }
                                required
                            />

                        </div>

                        <div className="input-group">

                            <label htmlFor="clave">
                                Clave
                            </label>

                            <input
                                id="clave"
                                className="input-dato"
                                type="password"
                                placeholder="Escribe tu clave"
                                value={clave}
                                onChange={(event) =>
                                    setClave(event.target.value)
                                }
                                required
                            />

                        </div>

                        <button
                            className="positive-button"
                            type="submit"
                        >
                            <LoginIcon />
                            Registrarte
                        </button>

                    </form>

                    <Link
                        className="Link-modo"
                        to="/"
                    >
                        <ArrowBackIcon />
                        Volver al Dashboard
                    </Link>

                </div>

            </section>

        </main>
    );
}