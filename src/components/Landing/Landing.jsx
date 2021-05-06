import React, { useState } from 'react'
import Login from '../Login/Login'
import Register from '../Register/Register'

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
            <div className="slogan top">
                    <p>FIND YOUR HOBBY</p>
                </div>
                <div className="slogan bottom">
                    <p>CONNECT WITH PEOPLE</p>
                </div>
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
