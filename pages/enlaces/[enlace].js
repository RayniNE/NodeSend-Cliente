import { useState, useContext } from 'react';
import Layout from '../../components/Layout';
import clienteAxios from '../../config/axios';
import appContext from '../../context/app/appContext';
import Alerta from '../../components/Alerta';

export async function getStaticProps({params}){

    const { enlace } = params;
    const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);

    // console.log(resultado.data);

    return{
        props: {
            enlace: resultado.data
        }
    }

}

export async function getStaticPaths(){
    
    const enlaces = await clienteAxios.get('/api/enlaces');

    // console.log(enlaces);

    return{
        paths: enlaces.data.enlaces.map((enlace) => ({
            params: { enlace: enlace.url}
        })),
        fallback: false
    }

}

export default ({enlace}) => {

    //Context de App.
    const AppContext = useContext(appContext)
    const { mostrarAlerta, mensaje_archivo } = AppContext;

    const [ hasPassword, setHasPassword ] = useState(enlace.password);
    const [ password, setPassword ] = useState('');

    const verificarPassword = async e => {
        e.preventDefault();

        const data = {
            password
        }
        
        try {
            const resultado = await clienteAxios.post(`/api/enlaces/${enlace.enlace}`, data);
            setHasPassword(resultado.data.password);
        } catch (error) {
            mostrarAlerta(error.response.data.msg);
        }


    }

    return (
        <Layout>

            {
                hasPassword ? (
                    <>

                        <h3 className="text-center font-bold"> Este enlace esta protegido por una contraseña, colocala a continuacion </h3>

                        { mensaje_archivo && <Alerta/> }

                        <div className="flex justify-center">
                            <div className="w-full max-w-lg mt-4">
                                <form
                                    className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={e => verificarPassword(e)}
                                >
                                    
                                    <div className="mb-4">
                                        <label 
                                            className="block text-black text-sm font-bold mb-2"
                                            htmlFor="password"> Contraseña </label>
                                        <input 
                                            type="password"
                                            id="password"
                                            placeholder="Contraseña del archivo"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            onChange={e => setPassword(e.target.value)}
                                            />
                                    </div>

                                    <input
                                        type="submit"
                                        className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                                        value="Validar contraseña"/>

                                </form>
                            </div>
                        </div>


                    </>
                ) : (
                    <>
                        <h1 className="text-4xl text-center text-gray-700"> Descarga tu archivo: </h1>
                        <div className="flex items-center justify-center mt-10">
                            <a
                                href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
                                className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
                            > Aquí </a>
                        </div>
                    </>
                )   
            }

        </Layout>

    )
}