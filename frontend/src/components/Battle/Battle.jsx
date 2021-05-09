import React from 'react'
import { connect } from 'react-redux';
import Header from '../Header/Header';
import vs from '../../img/vs.png'

const Battle = (props) => {

    console.log(props.compareList)

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
                            props.compareList[0] ?
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
                            <div className="buttons"></div>
                            <div className="buttons"></div>
                            <div className="buttons"></div>
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
