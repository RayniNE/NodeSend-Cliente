import React, { useEffect, useContext } from 'react';
import Link from 'next/link';
import authContext from '../context/auth/authContext';
import appContext from '../context/app/appContext';
import { useRouter } from 'next/router';

const Header = () => {

    const AuthContext = useContext(authContext);
    const { usuarioAutenticado, usuario, cerrarSesion } = AuthContext;

    const AppContext = useContext(appContext);
    const { limpiarState } = AppContext;

    const router = useRouter();

    const redireccionar = () => {
        router.push('/');
        limpiarState();
    }
  
    useEffect(() => {
      usuarioAutenticado();
    }, []);

    return ( 
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">

                <img 
                    src="/logo.svg"
                    className="w-64 mb-8 md:mb-0 cursor-pointer"
                    onClick={() => redireccionar()}/>
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