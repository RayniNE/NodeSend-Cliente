import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import clienteAxios from '../../config/axios';

import {
    USUARIO_AUTENTICADO,
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    LIMPIAR_ALERTA
} from '../../types/index';

const AuthState = ({children}) => {

    //State inicial.
    const initialState = {

        token: '',
        autenticado: null,
        usuario: null,
        mensaje: null

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

    //Usuario autenticado
    const usuarioAutenticado = (nombre) => {

        dispatch({
            type: USUARIO_AUTENTICADO,
            payload: nombre
        })

    }

    return ( 
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                usuarioAutenticado,
                registrarUsuario
            }}
        >
           
           {children}
        </authContext.Provider>
     );
}
 
export default AuthState;