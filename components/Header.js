import React, { useEffect, useContext } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';

const Header = () => {

    const AuthContext = useContext(authContext);
    const { usuarioAutenticado, usuario, cerrarSesion } = AuthContext;
  
    useEffect(() => {
      usuarioAutenticado();
    }, []);

    return ( 
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">

            <Link href="/">
                <img src="logo.svg" className="w-64 mb-8 md:mb-0"/>
            </Link>

            <div>

                {usuario ? 
                
                    <div className="flex items-center">
                        <p className="mr-2"> Bienvenido {usuario.nombre} </p>
                        <button
                            type="button"
                            className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2"
                            onClick={() => cerrarSesion()}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                
                : (
                    <div>
                        <Link href="/login">
                            <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2"> Iniciar Sesión </a>
                        </Link>

                        <Link href="/crearcuenta">
                            <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase mr-2"> Crear Cuenta </a>
                        </Link>
                    </div>
                ) }

            </div>

        </header>
     );
}
 
export default Header;