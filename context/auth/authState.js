import React from 'react';
import authContext from './authContext';

const AuthState = ({children}) => {

    const hola = () => {
        console.log("Hola");
    }

    return ( 
        <authContext.Provider
            value={{
                hola
            }}
        >
           
           {children}
        </authContext.Provider>
     );
}
 
export default AuthState;