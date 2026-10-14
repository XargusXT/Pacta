import React, { useState } from 'react';
import '../styles/ModoEditable.css';
import axios from 'axios'

import { Link,useNavigate} from 'react-router-dom';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LoginIcon from '@mui/icons-material/Login';

import logo from '../assets/image.png';

interface Response{
    success:boolean
    message:string
}

interface User{
    usuario:String,
    clave:String
}

export default function ModoSetting() {
    const navigate=useNavigate();

    const [usuario, setUsuario] = useState('');
    const [clave, setClave] = useState('');
    const [message,setMessage]=useState<String>('')

    const login= async (e) => {
        e.preventDefault();

        const user:User={
            usuario:usuario,
            clave:clave
        }

        try{
            const response =await axios.post<Response>('/api/auth/loginAdmin',user)
            const data=await response.data
            if(data.success==true){
                navigate('/Setting')
            }else{
                setMessage(`Error:${data.message}`)
            }
        }catch(error){
                setMessage(`Error`)
        }
    }
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

                    <h3>Modo Configuracion</h3>

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
                        <LockOutlinedIcon />{message}
                    </div>

                    <h2>Acceso al modo Configuracion</h2>

                    <p className="form-description">
                        Introduce tus credenciales para
                        continuar.
                    </p>

                    <form>

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

                        

                    </form>

                    <button
                            className="positive-button"
                            onClick={login}
                        >
                            <LoginIcon />
                            Registrarte
                        </button>
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