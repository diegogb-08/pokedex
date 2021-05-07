import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {




    return (
        <div className="headerComponent">
            <div className="navbar">
                <Link to={'/'} className="link" >
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
        </div>
    )
}

export default Header
