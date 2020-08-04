import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useQuery } from '@apollo/client';
import gql from "graphql-tag";

const GET_AUDIT = gql`
    query {
        clients {
            id
            nom
            prenom
            contact
            email
            address {
                adresse
                departement
                code_postale
                ville
                pays
                latitude
                longitude
                altitude
            }
            audits {
                id
                numero
            }
        }
    }
`

const ClientList = () => {
    const { data, loading, error } = useQuery(GET_AUDIT);
    if (error) return <p>Error</p>;

    console.log(data);
    return (
        <React.Fragment>
            <Sidebar />
            <div className="app_container relative">
                { loading ? (<div className="absolute top-0 left-0 z-10 bg-white bg-opacity-50 flex items-center justify-center w-full h-screen">Chargement</div>) : null }
                <h2>Création d'un nouvel audit</h2>

                <p>
                    <a href="https://en.wikipedia.org/wiki/List_of_Pok%C3%A9mon">
                        The Pokémon franchise
                    </a>{" "}
                    revolves around 832 fictional species of collectible monsters, each having
                    unique designs and skills. Conceived by Satoshi Tajiri in early 1989,
                    Pokémon are creatures that inhabit the fictional Pokémon World. This is
                    the list of the first 150 Pokémon as they appear in Pokémon Stadium,
                    starting with Bulbasaur in the top left corner and ending with Mewtwo in
                    the bottom right corner.
                </p>
                <div className="container">
                    {data &&
                        data.pokemons &&
                        data.pokemons.map((pokemon, index) => (
                        <div key={index} className="card">
                            <img src={pokemon.image} alt={pokemon.name} />
                            <div className="card-body">
                            <h3>{pokemon.name}</h3>
                            <p>
                                {pokemon.evolutions && pokemon.evolutions.length !== 0 && (
                                <p>
                                    {" "}
                                    Evolutions:
                                    {pokemon.evolutions.map((e, indx) => {
                                    return <p key={indx}> {e.name} </p>;
                                    })}
                                </p>
                                )}
                            </p>
                            </div>
                        </div>
                        ))}
                </div>
            </div>
        </React.Fragment>
    )
}

export default ClientList
