import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import pokeball from '../../img/pokeball.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Header = (props) => {

    let history = useHistory();

    const [showPokeballs, setShowPokeballs] = useState({})
    const [color, setColor] = useState({})

    useEffect(()=>{
        if(props.compareList.length > 0)
        setShowPokeballs({display: 'flex'})
    },[props.compareList])

    const showBattle = () => {
        setTimeout(()=>{
            history.push('/battle')
        },500)
    }

    const getFirstName = (name) => {
        const firstName = name.split(' ')

        return firstName[0]

    }

    const setColorLink = (string) => {
        setColor({[string]:{color: 'red'}});
    }

    return (
        <div className="headerComponent" >
            <div className="navbar" >
                <Link to={'/home'} className="link" style={color} onClick={()=>setColorLink('home')}>
                    <p>Home</p>
                </Link>
                <Link to={'/location'} className="link" style={color} onClick={()=>setColorLink('location')}>
                    <p>Location</p>
                </Link>
                <Link to={'/color'} className="link" style={color} onClick={()=>setColorLink('color')}>
                    <p>Color</p>
                </Link>
                <Link to={'/species'} className="link" style={color} onClick={()=>setColorLink('species')}>
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
            <div className="user">
                <h2>Welcome, {getFirstName(props.user.fullName)}!</h2>
            </div>
            <FontAwesomeIcon icon={faChevronDown} className="arrowLogout"/>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        compareList: state.pokemonReducer.compareList,
        user: state.userReducer.user
    }
}


export default connect(mapStateToProps)(Header); 
