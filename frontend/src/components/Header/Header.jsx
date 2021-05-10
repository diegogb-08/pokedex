import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import pokeball from '../../img/pokeball.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { LOGOUT } from '../../redux/types/userType';

const Header = (props) => {

    let history = useHistory();

    const [showPokeballs, setShowPokeballs] = useState({display: 'none'});

    const [open, setOpen] = useState(false);
    const [rotate,setRotate] = useState({transform: 'rotate(0deg)'});

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

        if(props.user.fullName){
        const firstName = name.split(' ')

        return firstName[0]
        }
    }    

    const openDropDown = () => {

        if(rotate.transform === 'rotate(0deg)'){
            setOpen(!open)
            setRotate({transform: 'rotate(180deg)'})
        }else{
            setOpen(!open)
            setRotate({transform: 'rotate(0deg)'})
        }
    }

    const logOut = () => {
        props.dispatch({type: LOGOUT})
    }

    return (
        <div className="headerComponent" >
            <div className="navbar" >
                <Link to={'/home'} className="link" >
                    <p>Home</p>
                </Link>
                <Link to={'/location'} className="link" >
                    <p>Location</p>
                </Link>
                <Link to={'/color'} className="link" >
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
            <div className="user">
                <h2>Welcome, {getFirstName(props.user.fullName)}!</h2>
            </div>
            <FontAwesomeIcon icon={faChevronDown} className="arrowLogout" onClick={()=>openDropDown()} style={rotate}/>
            {
                open && 
                <>
                    <div className="drowpDown" onClick={()=>logOut()}>
                        <FontAwesomeIcon icon={faSignOutAlt} className="iconLogout"/>
                        <p>Logout</p>
                    </div>
                </>
            }
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