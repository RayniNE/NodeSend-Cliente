import React from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CrearCuenta = () => {

    const formik = useFormik({

        initialValues: {
            nombre: '',
            correo: '',
            contraseña: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                        .required('El nombre es obligatorios'),
            correo: Yup.string()
                        .email('El email no es valido')
                        .required('El email es obligatorio'),
            contraseña: Yup.string()
                            .required('La contraseña es obligatoria')
                            .min(6, 'La contraseña debe contener al menos 6 caracteres')
        }),
        onSubmit: (valores) => {
            console.log(valores)
        }

    });

    return ( 
        <Layout>
            <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
                <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4"> Crear Cuenta </h2>

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

                            {formik.touched.correo && formik.errors.correo ? (

                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"> Error </p>
                                    <p> {formik.errors.correo} </p>
                                </div>

                            ) : null}

                            <div className="mb-4">
                                <label
                                    htmlFor="correo"
                                    className="block text-black text-sm font-bold mb-2"> Correo </label>

                                <input 
                                    type="email"
                                    id="correo"
                                    placeholder="Correo del usuario"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={formik.values.correo}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}/>
                            </div>

                            {formik.touched.contraseña && formik.errors.contraseña ? (

                                <div className="my-2 bg-gray-200 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold"> Error </p>
                                    <p> {formik.errors.contraseña} </p>
                                </div>

                            ) : null}

                            <div className="mb-4">
                                <label
                                    htmlFor="contraseña"
                                    className="block text-black text-sm font-bold mb-2"> Contraseña </label>

                                <input 
                                    type="password"
                                    id="contraseña"
                                    placeholder="Contraseña del usuario"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={formik.values.contraseña}
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