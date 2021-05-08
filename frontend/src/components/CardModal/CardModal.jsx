import React, { useState } from 'react'
import Modal from '../Modal/Modal';
import axios from 'axios';
import PokeCard from '../PokeCard/PokeCard';
import Button from '../Button/Button';
import { connect } from 'react-redux';
import { COMPARE } from '../../redux/types/pokemonType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

const CardModal = (props) => {

    const {children, pokemon} = props
    // Modal Hook
    const [active, setActive] = useState(false);
    const toggle = () => {
        setActive(!active)
        getColor()
    } 

    const [colorKind, setColorKind] = useState({})
    const [message, setMessage] = useState('');
    const [check, setCheck] = useState({})

    const getColor = async () => {

        try{

            let result = await axios.get(pokemon.species.url)

            if(result.data)
                setColorKind({backgroundColor: result.data.color.name})

        }catch(err) {

        }
    }
    
    const addPokemon = (pokemon) => {

        setMessage('')

        if(props.compareList.length < 2){
            if(props.compareList.find(element => element.id === pokemon.id) === undefined){
                props.dispatch({type: COMPARE, payload: pokemon})
                setCheck({display: 'block'})
                setTimeout(()=>{
                    toggle()
                },500)
            }else{
                setMessage('Impossible to add 2 times the same pokemon')
            }
        }else{
            setMessage('You are trying to add more than 2 pokemons to compare')
        }
    }
    
    return (
        <div className="cardModalComponent" >
            <div onClick={()=>toggle()}>{children}</div>
            <Modal active={active} toggle={()=>toggle()}>
                <div className="cardModalContainer" style={colorKind}>
                    <div className="imgContainer">
                        <PokeCard pokemon={pokemon} card={true}/>
                        <img src={pokemon.sprites.other.dream_world.front_default} alt="" />
                        <PokeCard backImg={pokemon} />
                    </div>
                    <FontAwesomeIcon icon={faCheckCircle} className="check" style={check}/>
                    <div className="whiteShadow">
                        <h2>{pokemon.name.toUpperCase()}</h2>
                        <div className="pokeInfo">
                            <div className="stats">
                                <h3>Abilities:</h3>
                                <ul>
                                    {
                                        pokemon?.abilities.map((ability, i) => {
                                            return(
                                                <li key={i}>{ability.ability.name}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="stats">
                                <h3>Stats:</h3>
                                <ul>
                                    {
                                        pokemon?.stats.map((stat, i) => {
                                            return(
                                                <li key={i}>{stat.stat.name}: <b>{stat.base_stat}</b></li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="stats">
                                <h3>Type:</h3>
                                <ul>
                                    {
                                        pokemon?.types.map((type, i) => {
                                            return(
                                                <li key={i}>{type.type.name}</li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="stats">
                                <ul>
                                    <li>Weight: {pokemon.weight} kg</li>
                                    <li>Height: {pokemon.height} m</li>
                                    <li>Base Experience: {pokemon.base_experience}</li>
                                </ul>
                                <div className="addPokemonToList">
                                    <Button onClick={()=>addPokemon(pokemon)}>
                                        <p>Compare Pokemon</p>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <p className="message">{message}</p>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        compareList: state.pokemonReducer.compareList,
    }
}


export default connect(mapStateToProps)(CardModal);
