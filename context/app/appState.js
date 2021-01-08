import React, { useReducer } from 'react';
import appContext from './appContext';

import {
    MOSTRAR_ALERTA,
    OCULTAR_ALERTA,
    SUBIR_ARCHIVO_EXITO,
    SUBIR_ARCHIVO_ERROR,
    CREAR_ENLACE_EXITO,
    CREAR_ENLACE_ERROR

} from '../../types/index';

const AppState = ({children}) => {

    return ( 
        <appContext.Provider
            value={{

            }}
        >
            {children}
        </appContext.Provider>
     );
}
 
export default AppState;