import React, { useContext, useEffect } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import authContext from '../context/auth/authContext';
import Alerta from '../components/Alerta';

const CrearCuenta = () => {

    const AuthContext = useContext(authContext);
    const { usuarioAutenticado, registrarUsuario, mensaje } = AuthContext;


    const formik = useFormik({

        initialValues: {
            nombre: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                        .required('El nombre es obligatorios'),
            email: Yup.string()
                        .email('El email no es valido')
                        .required('El email es obligatorio'),
            password: Yup.string()
                            .required('La contraseña es obligatoria')
                            .min(6, 'La contraseña debe contener al menos 6 caracteres')
        }),
        onSubmit: (valores) => {
            registrarUsuario(valores);
        }

    });

    return ( 
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4"> Crear Cuenta </h2>

                { mensaje && <Alerta/> }

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">
                        <form
                            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}
                        >

                            {formik.touched.nombre && formik.errors.nombre ? (

                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"> Error </p>
                                    <p> {formik.errors.nombre} </p>
                                </div>

                            ) : null}
                            
                            <div className="mb-4">
                                <label
                                    htmlFor="nombre"
                                    className="block text-black text-sm font-bold mb-2"> Nombre </label>

                                <input 
                                    type="text"
                                    id="nombre"
                                    placeholder="Nombre del usuario"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={formik.values.nombre}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    />
                            </div>

                            {formik.touched.email && formik.errors.email ? (

                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"> Error </p>
                                    <p> {formik.errors.email} </p>
                                </div>

                            ) : null}

                            <div className="mb-4">
                                <label
                                    htmlFor="email"
                                    className="block text-black text-sm font-bold mb-2"> email </label>

                                <input 
                                    type="email"
                                    id="email"
                                    placeholder="Correo del usuario"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}/>
                            </div>

                            {formik.touched.password && formik.errors.password ? (

                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"> Error </p>
                                    <p> {formik.errors.password} </p>
                                </div>

                            ) : null}

                            <div className="mb-4">
                                <label
                                    htmlFor="password"
                                    className="block text-black text-sm font-bold mb-2"> password </label>

                                <input 
                                    type="password"
                                    id="password"
                                    placeholder="password del usuario"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}/>
                            </div>

                            <input
                                type="submit"
                                className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                                value="Crear cuenta"/>

                        </form>
                    </div>
                </div>
            </div>
        </Layout>
     );
}
 
export default CrearCuenta;