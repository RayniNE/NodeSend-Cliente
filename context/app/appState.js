import React, { useReducer } from 'react';
import appContext from './appContext';
import appReducer from './appReducer';

import clienteAxios from '../../config/axios';

import {
    MOSTRAR_ALERTA,
    LIMPIAR_ALERTA,
    SUBIR_ARCHIVO,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR,
    LIMPIAR_STATE

} from '../../types/index';

const AppState = ({children}) => {

    const initialState = {
        mensaje_archivo: null,
        nombre_original: '',
        nombre: '',
        cargando: null,
        autor: null,
        descargas: 1,
        url: '',
        password: ''
    }

    //Crear dispatch y state.
    const [state, dispatch] = useReducer(appReducer, initialState);

    //Mostrar la alerta.
    const mostrarAlerta = (msg) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: msg
        })

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000)
    }

    //Subir archivo.
    const subirArchivo = async (formData, nombreArchivo) => {

        dispatch({
            type: SUBIR_ARCHIVO
        })


        try {
            const resultado = await clienteAxios.post('/api/archivos', formData);

            dispatch({
                type: SUBIR_ARCHIVO_EXITO,
                payload: {
                    nombre: resultado.data.archivo,
                    nombre_original: nombreArchivo
                }
            })
        } catch (error) {
            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: error.response.data.msg
            })
        }
    }

    //Metodo para crear la URL del archivo.
    const crearEnlace = async () => {

        const data = {
            nombre: state.nombre,
            nombre_original: state.nombre_original,
            descargas: state.descargas,
            password: state.password,
            autor: state.autor
        }

        try {
            const resultado = await clienteAxios.post('/api/enlaces', data);
            dispatch({
                type: CREAR_ENLACE_EXITO,
                payload: resultado.data.enlace
            })
        } catch (error) {
            console.log(error);
        }
    }

    const limpiarState = () => {

        dispatch({
            type: LIMPIAR_STATE
        })

    };
 
    return ( 
        <appContext.Provider
            value={{
                mensaje_archivo: state.mensaje_archivo,
                nombre: state.nombre,
                nombre_original: state.nombre_original,
                cargando: state.cargando,
                autor: state.autor,
                descargas: state.descargas,
                url: state.url,
                password: state.password,
                mostrarAlerta,
                subirArchivo,
                crearEnlace
            }}
        >
            {children}
        </appContext.Provider>
     );
}
 
export default AppState;