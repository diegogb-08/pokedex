import React from 'react'
import { Link } from 'react-router-dom'

const Header = (props) => {


    const handleChange = (e) => {
        props.onChange(e)
    }

    const dropDownMenu = () => {
        
    }

    return (
        <div className="headerComponent">
            <div className="navbar">
                <Link to={'/'} className="link" >
                    <p>Home</p>
                </Link>
                <div className="filter" onClick={()=>dropDownMenu()}>
                    <h4>Filter</h4>

                </div>
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
            <div className="sequence">
                <h4>Sequence</h4>
                <input type="number" name="offset" defaultValue={0} onChange={handleChange}/>
                <p>to</p>
                <input type="number" name="limit" defaultValue={20} onChange={handleChange}/>
            </div>
        </div>
    )
}

export default Header
