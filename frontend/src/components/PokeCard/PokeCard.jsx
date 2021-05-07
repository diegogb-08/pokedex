import React from 'react'

const PokeCard = ({pokemon}) => {


    return (
        <div className="pokeCardComponent">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokeImg"/>
        </div>
    )
}

export default PokeCard
