import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import tokenAuth from '../../config/tokenAuth';

import clienteAxios from '../../config/axios';

import {
    USUARIO_AUTENTICADO,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types/index';

const AuthState = ({children}) => {

    //State inicial.
    const initialState = {

        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: null

    };

    //Se define el reducer.
    const [ state, dispatch] = useReducer(authReducer, initialState);

    const registrarUsuario = async (datos) => {
        try {
            const respuesta = await clienteAxios.post('/api/usuarios', datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.msg
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.error
            })
        }

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000);
    }

    //Autenticar Usuarios.
    const iniciarSesion = async (datos) => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            // console.log(respuesta.data.token);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            })
        } catch (error) {
            console.log(error.response.data.msg);
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }

        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000);
    }

    //Usuario autenticado
    const usuarioAutenticado = async () => {

        const token = localStorage.getItem('token');

        if(token){
            tokenAuth(token);
        }

        try {
            const resultado = await clienteAxios.get('/api/auth');

            if(resultado.data.usuario){
                dispatch({
                    type: USUARIO_AUTENTICADO,
                    payload: resultado.data.usuario
                })
            }
        } catch (error) {
            console.log(error);
        }

    }

    //Cerrar Sesion
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return ( 
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                usuarioAutenticado,
                registrarUsuario,
                iniciarSesion,
                cerrarSesion
            }}
        >
           
           {children}
        </authContext.Provider>
     );
}
 
export default AuthState;