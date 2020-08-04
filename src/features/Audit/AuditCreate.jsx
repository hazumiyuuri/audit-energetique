import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import gql from "graphql-tag";
import { AuditCreateSchema } from './AuditCreate.schema';
import history from '../../history';

const CREATE_AUDIT = gql`
    mutation createAudit($numero: String!, $client: ClientInput!) {
        createAudit(
            auditInput: {
                numero: $numero,
                client: $client
            }
        ) {
            id
        }
    }`

const AuditCreate = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [createAudit, { loading, error }] = useMutation(CREATE_AUDIT, {
        onCompleted({ createAudit }) {
            history.push("/")
        },
        onError(error) {
            setErrorMessage(error.message);
        },
    });

    // if (loading) return <div className="absolute top-0 left-0 z-10 bg-white bg-opacity-50 flex items-center justify-center w-full h-screen">Chargement</div>;
    // if (error) return <p>Error</p>;

    const formik = useFormik({
        initialValues: {
            numero_audit: '',
            nom: '',
            prenom: '',
            telephone: '',
            email: '',
            adresse: '',
            ville: '',
            code_postale: '',
            pays: ''
        },
        validationSchema: AuditCreateSchema,
        onSubmit: async (values) => {
            console.log(`values`, values);
            const auditInput = {
                numero: String(values.numero_audit),
                client: {
                    id: values.client_id ? values.client_id : null,
                    nom: values.nom,
                    prenom: values.prenom,
                    telephone: values.telephone,
                    email: values.email,
                },
            }

            createAudit({ variables: auditInput });
        },
    });

    return (
        <React.Fragment>
            <Sidebar />
            <div className="app_container relative">
                <h2 className="mb-4">Création d'un nouvel audit</h2>

                <div className="w-auto lg:w-full mt-4 bg-white px-8 py-8 shadow-md">
                    <form className="w-full" onSubmit={formik.handleSubmit}>
                        <div className="w-full">
                            <div className="w-full">
                                <h3 className="text-left text-2xl font-bold text-blue-700 mb-4">Information sur l'audit</h3>
                            </div>
                            <p className="mb-2 text-gray-600">Veuillez remplir le formulaire pour la création d'un nouvel audit</p>
                            <div className="md:flex md:justify-start mb-4">
                                <div className="w-auto mr-4">
                                    <label className="block text-gray-700 md:text-left mb-1 md:mb-0 pr-4">
                                        Numero de l'audit
                                    </label>
                                    <input
                                        id="numero_audit"
                                        className="bg-white appearance-none border border-gray-400 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                        type="text"
                                        onChange={(event) => formik.setFieldValue('numero_audit', event.target.value)} />
                                    { formik.errors.hasOwnProperty('numero_audit') ? (<p className="error-text">Le numero de l'audit est obligatoire</p>) : null}
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <div className="w-full lg:w-1/2 mr-2">
                                <div className="w-full">
                                    <h3 className="text-left text-2xl font-bold text-blue-700 mb-4">Information sur le client</h3>
                                </div>

                                <div className="md:flex md:justify-start mb-4">
                                    <div className="w-auto mr-4">
                                        <label className="block text-gray-700 md:text-left mb-1 md:mb-0 pr-4">
                                            Nom
                                        </label>
                                        <input 
                                            id="nom"
                                            className="bg-white appearance-none border border-gray-400 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            type="text"
                                            onChange={(event) => formik.setFieldValue('nom', event.target.value)} />
                                        { formik.errors.hasOwnProperty('nom') ? (<p className="error-text">Le nom ne doit pas être vide</p>) : null}
                                    </div>

                                    <div className="w-auto">
                                        <label 
                                            className="block text-gray-700 md:text-left mb-1 md:mb-0 pr-4">
                                            Prenom
                                        </label>
                                        <input
                                            id="prenom"
                                            className="bg-white appearance-none border border-gray-400 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            type="text"
                                            onChange={(event) => formik.setFieldValue('prenom', event.target.value)} />
                                        { formik.errors.hasOwnProperty('prenom') ? (<p className="error-text">Le prénom ne doit pas être vide</p>) : null}
                                    </div>
                                </div>

                                <div className="md:flex md:justify-start mb-4">
                                    <div className="w-auto mr-4">
                                        <label
                                            className="block text-gray-700 md:text-left mb-1 md:mb-0 pr-4">
                                            Téléphone
                                        </label>
                                        <input 
                                            id="telephone"
                                            className="bg-white appearance-none border border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            type="text"
                                            onChange={(event) => formik.setFieldValue('telephone', event.target.value)} />
                                        { formik.errors.hasOwnProperty('telephone') ? (<p className="error-text">Le téléphone ne doit pas être vide</p>) : null}
                                    </div>
                                    <div className="w-auto">
                                        <label
                                            className="block text-gray-700 md:text-left mb-1 md:mb-0 pr-4">
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            className="bg-white appearance-none border border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            type="text"
                                            onChange={(event) => formik.setFieldValue('email', event.target.value)} />
                                        { formik.errors.hasOwnProperty('email') ? (<p className="error-text">L'email est invalide ou incorrect</p>) : null}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 ml-2">
                                <div className="w-full">
                                    <h3 className="text-left text-2xl font-bold text-blue-700 mb-4">Information sur la domicile</h3>
                                </div>

                                <div className="md:flex md:justify-start mb-4">
                                    <div className="w-auto">
                                        <label
                                            className="block text-gray-700 md:text-left mb-1 md:mb-0 pr-4">
                                            Adresse
                                        </label>
                                        <textarea
                                            id="adresse"
                                            style={{width: '325px'}}
                                            className="bg-white appearance-none border border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            type="text"
                                            onChange={(event) => formik.setFieldValue('adresse', event.target.value)}></textarea>
                                        { formik.errors.hasOwnProperty('adresse') ? (<p className="error-text">L'adresse ne doit pas être vide</p>) : null}
                                    </div>
                                </div>

                                <div className="md:flex items-start mb-4">
                                    <div className="w-auto mr-4">
                                        <label
                                            className="block text-gray-700 md:text-left mb-1 md:mb-0 pr-4">
                                            Ville
                                        </label>
                                        <input 
                                            id="ville"
                                            className="bg-white appearance-none border border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            type="text"
                                            onChange={(event) => formik.setFieldValue('ville', event.target.value)} />
                                        { formik.errors.hasOwnProperty('ville') ? (<p className="error-text">La ville ne doit pas être vide</p>) : null}
                                    </div>
                                    <div className="w-auto mr-4">
                                        <label
                                            className="block text-gray-700 md:text-left mb-1 md:mb-0 pr-4">
                                            Code Postale
                                        </label>
                                        <input
                                            id="code_postale"
                                            className="bg-white appearance-none border border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                            type="text"
                                            onChange={(event) => formik.setFieldValue('code_postale', event.target.value)} />
                                    { formik.errors.hasOwnProperty('code_postale') ? (<p className="error-text">La ville ne doit pas être vide</p>) : null}
                                    </div>
                                </div>

                                <div className="md:flex md:justify-start mb-4">
                                    <div className="w-auto mr-4">
                                        <label
                                            className="block text-gray-700 md:text-left mb-1 md:mb-0 pr-4">
                                            Pays
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="pays"
                                                style={{width: '255px'}}
                                                className="bg-white appearance-none border border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                                type="text"
                                                onChange={(event) => formik.setFieldValue('pays', event.target.value)}>
                                                <option value="">----Séléctionner un pays----</option>
                                                <option value="France">France</option>
                                                <option value="Madagascar">Madagascar</option>
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                            </div>
                                        </div>
                                        { formik.errors.hasOwnProperty('pays') ? (<p className="error-text">Un pays doît être choisit</p>) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:flex md:justify-start">
                            <div>
                                <button type="submit" className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4">
                                    Créer le dossier
                                </button>
                                { errorMessage ? (<p className="error-text">{ errorMessage }</p>) : null}
                            </div>
                        </div> 
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AuditCreate;
