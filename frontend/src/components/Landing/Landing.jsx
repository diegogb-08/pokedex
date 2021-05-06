import React, { useState } from 'react'
import Login from '../Login/Login'
import Register from '../Register/Register'
import pokemon from '../../img/Pokemon-Logo.png'

const Landing = (props) => {

    const [active, setActive] = useState(true)

    
    const register = () => {
        setTimeout(()=>{
            setActive(!active)
        },500)
    }



    return (
        <div className="landingComponent">
            <div className="landingContainers landingLeft">
                <img className="logoPokemon" src={pokemon} alt="pokemon" />
            </div>
            <div className="landingContainers landingRight">
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                {
                    active ? 
                    <>
                        <Login/> 
                        <div className="registerLanding">
                            <p>Don't have an account?</p>
                            <p className="register" onClick={()=>register()}>Register</p>
                        </div>
                    </>

                    : 
                    <>
                        <Register />
                        <div className="registerLanding">
                            <p>Do you have an account?</p>
                            <p className="register" onClick={()=>register()}>Sign In</p>
                        </div>
                    </>

                }
                
            </div>
        </div>
    )
}

export default Landing
