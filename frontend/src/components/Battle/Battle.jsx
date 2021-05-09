import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import Header from '../Header/Header';
import vs from '../../img/vs.png'
import Button from '../Button/Button';
import { CLEAR, REMOVE } from '../../redux/types/pokemonType';
import { useHistory } from 'react-router';

const Battle = (props) => {

    let history = useHistory()

    const clearPokemon = (index) => {
        
        if(index === null)
            props.dispatch({ type: CLEAR, payload: [] });
        else
            setTimeout(()=>{
                props.dispatch({ type: REMOVE, payload: index });
            },200)
    }

    useEffect(()=>{

        if(props.compareList.length === 0)
            setTimeout(()=>{
                history.push('/home')
            },500)
        // eslint-disable-next-line
    },[props.compareList])

    return (
        <div className="battleComponent">
            <div className="battleContainer">
                <Header />
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="battleFieldContainer">
                    <div className="battle">
                        {
                            props?.compareList[0] ?
                            <>
                                <img src={props.compareList[0].sprites.other.dream_world.front_default} alt="" />
                                <h1 className="pokemonName">{props.compareList[0].name}</h1>
                                <div className="statsCard">
                                    <div className="stats">
                                        <h3>Abilities:</h3>
                                        <ul>
                                            {
                                                props.compareList[0].abilities.map((ability, i) => {
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
                                                props.compareList[0].stats.map((stat, i) => {
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
                                                props.compareList[0].types.map((type, i) => {
                                                    return(
                                                        <li key={i}>{type.type.name}</li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="stats">
                                        <ul>
                                            <li>Weight: {props.compareList[0].weight} kg</li>
                                            <li>Height: {props.compareList[0].height} m</li>
                                            <li>Base Experience: {props.compareList[0].base_experience}</li>
                                        </ul>
                                    </div>
                                </div>
                            </>
                            : null
                        }
                    </div>
                    <div className="vs">
                        <img src={vs} alt="" />
                        <div className="buttonsBattle">
                            <div className="buttons">
                                <Button onClick={()=>clearPokemon(0)} >
                                    <p>Remove <br /> {props.compareList[0]?.name ? props.compareList[0].name : null}</p>
                                </Button>
                            </div>
                            <div className="buttons">
                                <Button onClick={()=>clearPokemon(null)} >
                                    <p>CLEAR <br />POKEMONS</p>
                                </Button>
                            </div>
                            <div className="buttons">
                                {
                                    props.compareList[1] ?

                                        <Button onClick={()=>clearPokemon(1)} >
                                            <p>Remove <br /> {props.compareList[1]?.name ? props.compareList[1].name : null}</p>
                                        </Button>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                    <div className="battle">
                        {
                            props.compareList[1] ?
                            <>
                                <img src={props.compareList[1].sprites.other.dream_world.front_default} alt="" />
                                <h1 className="pokemonName">{props.compareList[1].name}</h1>
                                <div className="statsCard">
                                    <div className="stats">
                                        <h3>Stats:</h3>
                                        <ul>
                                            {
                                                props.compareList[1].stats.map((stat, i) => {
                                                    return(
                                                        <li key={i}>{stat.stat.name}: <b>{stat.base_stat}</b></li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="stats">
                                        <h3>Abilities:</h3>
                                        <ul>
                                            {
                                                props.compareList[1].abilities.map((ability, i) => {
                                                    return(
                                                        <li key={i}>{ability.ability.name}</li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div className="stats">
                                        <ul>
                                            <li>Weight: {props.compareList[1].weight} kg</li>
                                            <li>Height: {props.compareList[1].height} m</li>
                                            <li>Base Experience: {props.compareList[1].base_experience}</li>
                                        </ul>
                                    </div>
                                    <div className="stats">
                                        <h3>Type:</h3>
                                        <ul>
                                            {
                                                props.compareList[1].types.map((type, i) => {
                                                    return(
                                                        <li key={i}>{type.type.name}</li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </>
                            : null
                        }
                    </div>
                </div>

            </div>
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        compareList: state.pokemonReducer.compareList,
    }
}

export default connect(mapStateToProps)(Battle) 
