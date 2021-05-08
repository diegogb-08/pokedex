import React from 'react'

const PokeCard = ({pokemon,backImg,card}) => {

    return (
        <div className="pokeCardComponent">
            {
                backImg ?
                <>
                    <img src={backImg.sprites.back_default} alt={backImg.name} className="pokeImg"/>
                </>
                :
                <>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokeImg"/>
                    <h3>{card ? null : pokemon.name}</h3>
                </>
            }
        </div>
    )
}

export default PokeCard
