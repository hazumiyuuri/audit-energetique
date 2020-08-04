import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useLazyQuery } from '@apollo/client';
import gql from "graphql-tag";
import ReactToPrint from 'react-to-print';
import { NavLink } from 'react-router-dom';

// import dateformat from 'dateformat';

const GET_AUDIT = gql`
    query audit($id: String) {
        audit(id: $id) {
            numero
            date_audit
            client {
                nom
                prenom
                telephone
                email
                address {
                    adresse
                    departement
                    code_postale
                    ville
                    quartier
                    pays
                    latitude
                    longitude
                    altitude
                }
            }
        }
    }`

const AuditDetail = (props) => {
    const id = props.match.params.id;
    const [getAudit, { called, data, error }] = useLazyQuery(GET_AUDIT);
    const ref = React.createRef();

    // const handlePrint = useReactToPrint({
    //     content: () => ref.current,
    // });

    if (!called) {
        getAudit({ variables: { id }});
    }

    if (error) return <p>Error</p>;

    

    return (
        <React.Fragment>
            <Sidebar />
            <div className="app_container relative">
                <h2 className="mb-4">Détail de l'audit { data && data.audit && data.audit.numero }</h2>

                <div className="w-auto lg:w-full mt-4 bg-white shadow-md">
                    <div className="flex items-start justify-start px-8 pt-8">
                        <div>
                            <NavLink to="/audit/list">
                                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Retour</button>
                            </NavLink>
                        </div>
                        <ReactToPrint
                            trigger={() => 
                            <button className="ml-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Imprimer</button>}
                            content={() => ref.current}
                        />
                    </div>
                    
                    
                    <div ref={ref} className="px-8 py-8 pt-8">
                        <div className="w-full">
                            <h3 className="text-left text-2xl font-bold text-blue-700 mb-4">Détail de l'audit</h3>
                        </div>
                        
                        <div className="flex">
                            <div className="mt-4">
                                <label className="font-bold">Numéro de l'audit</label>
                                <div>{ data && data.audit && data.audit.numero }</div>
                            </div>
                        </div>
                        
                        <div className="flex">
                            <div className="mt-4">
                                <label className="font-bold">Prénom du client</label>
                                <div>{ data && data.audit.client && data.audit.client.prenom }</div>
                            </div>

                            <div className="mt-4 ml-4">
                                <label className="font-bold">Nom du client</label>
                                <div>{ data && data.audit.client && data.audit.client.nom }</div>
                            </div>
                        </div>
                        
                        <div className="flex">
                            <div className="mt-4">
                                <label className="font-bold">Téléphone</label>
                                <div>{ data && data.audit.client && data.audit.client.telephone }</div>
                            </div>

                            <div className="mt-4 ml-4">
                                <label className="font-bold">Email</label>
                                <div>{ data && data.audit.client && data.audit.client.email }</div>
                            </div>
                        </div>
                        

                        <h3 className="mt-4 text-left text-2xl font-bold text-blue-700 mb-4">Liste des domiciles</h3>
                        { data && data.audit.client && data.audit.client.address.map((item, key) => {
                            return (<>
                            <div className="flex items-center bg-gray-200 p-2">
                                <div className="px-20">
                                    <h2>N°{ key + 1 }</h2>
                                </div>
                                <div>
                                    <div className="mt-4">
                                        <label className="font-bold">Adresse</label>
                                        <div>{ item.adresse }</div>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold">Département</label>
                                        <div>{ item.departement }</div>
                                    </div>
                                    
                                    <div className="flex">
                                        <div className="mt-4">
                                            <label className="font-bold">Code Postale</label>
                                            <div>{ item.code_postale }</div>
                                        </div>

                                        <div className="mt-4 ml-4">
                                            <label className="font-bold">Quartier</label>
                                            <div>{ item.quartier ? item.quartier : 'N/A' }</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex">
                                        <div className="mt-4">
                                            <label className="font-bold">Ville</label>
                                            <div>{ item.ville }</div>
                                        </div>

                                        <div className="mt-4 ml-4">
                                            <label className="font-bold">Pays</label>
                                            <div>{ item.pays }</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                
                                
                                
                                {/* latitude
                                longitude
                                altitude */}
                            </>)
                        }) }
                        
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AuditDetail;
