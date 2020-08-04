import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useLazyQuery } from '@apollo/client';
import { NavLink } from 'react-router-dom';
import gql from "graphql-tag";

import dateformat from 'dateformat';

const GET_AUDIT = gql`
    query audits($search: String) {
        audits(search: $search) {
            id
            numero
            date_audit
            client {
                nom
                prenom
                telephone
                email
                address {
                    ville
                }
            }
        }
    }`

const AuditList = () => {
    const [getAudit, { called, data, loading, error }] = useLazyQuery(GET_AUDIT);

    if (!called) {
        getAudit();
    }

    if (error) return <p>Error</p>;
    
    return (
        <React.Fragment>
            <Sidebar />
            <div className="app_container relative">
                { loading ? (<div className="absolute top-0 left-0 z-10 bg-white bg-opacity-50 flex items-center justify-center w-full h-screen">Chargement</div>) : null }
                <h2 className="mb-4">Liste des audits</h2>
                
                <div className="px-8 py-8 w-auto lg:w-full mt-4 bg-white shadow-md">
                    <div className="flex items-center mb-2">
                        Rechercher : &nbsp; <input 
                            onChange={(event) => getAudit({ variables: { search: event.target.value } })}
                            className="bg-white appearance-none border border-gray-400 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" placeholder="Rechercher ici" />
                    </div>

                    <p className="mb-2 text-gray-600">Vous pouvez consulter dans cet onglet la liste de tous les audits effectués</p>
                    
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="border px-2 py-2" colSpan="2">Audit</th>
                                <th className="border px-2 py-2" colSpan="4">Client</th>
                                <th className="border px-2 py-2"></th>
                            </tr>
                            <tr>
                                <th className="border px-2 py-2">Date Audit</th>
                                <th className="border px-2 py-2">N° Audit</th>
                                <th className="border px-2 py-2">Nom</th>
                                <th className="border px-2 py-2">Prénom</th>
                                <th className="border px-2 py-2">Contact</th>
                                <th className="border px-2 py-2">Email</th>
                                <th className="border px-2 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { data && data.audits &&
                                data.audits.map((audit, index) => (
                                <tr key={index}>
                                    <td className="border px-2 py-2 text-center">{ dateformat(audit.date_audit, "dd/mm/yyyy") }</td>
                                    <td className="border px-2 py-2">{ audit.numero }</td>
                                    <td className="border px-2 py-2">{ audit?.client.nom }</td>
                                    <td className="border px-2 py-2">{ audit?.client.prenom }</td>
                                    <td className="border px-2 py-2">{ audit?.client.telephone }</td>
                                    <td className="border px-2 py-2">{ audit?.client.email }</td>
                                    <td className="border px-2 py-2">
                                        <NavLink to={`/audit/detail/${audit.id}`}>
                                            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent">Consulter</button>
                                        </NavLink>
                                    </td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AuditList
