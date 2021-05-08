import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import pokeball from '../../img/pokeball.png';

const Header = (props) => {

    const [showPokeballs, setShowPokeballs] = useState({})

    useEffect(()=>{
        if(props.compareList.length > 0)
        setShowPokeballs({display: 'flex'})
    },[props.compareList])

    const showBattle = () => {

    }

    return (
        <div className="headerComponent" >
            <div className="navbar" >
                <Link to={'/home'} className="link" >
                    <p>Home</p>
                </Link>
                <Link to={'/location'} className="link">
                    <p>Location</p>
                </Link>
                <Link to={'/color'} className="link">
                    <p>Color</p>
                </Link>
                <Link to={'/species'} className="link">
                    <p>Species</p>
                </Link>
            </div>
            <div className="comparePokemons" style={showPokeballs} onClick={()=>showBattle()}>
                {
                    props.compareList.length === 1 ?
                    <>
                        <img src={pokeball} alt="pokeball" className="pokeball"/>
                    </>
                    :
                    <>
                        <img src={pokeball} alt="pokeball" className="pokeball"/>
                        <img src={pokeball} alt="pokeball" className="pokeball"/>
                    </>
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        compareList: state.pokemonReducer.compareList,
    }
}


export default connect(mapStateToProps)(Header); 
