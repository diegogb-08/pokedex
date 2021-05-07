import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../Button/Button';

const Header = (props) => {

    const node = useRef();
    const [dropDownMenu, setDropDownMenu] = useState({display: 'none'})

    // sending data to parent component
    const handleChange = (e) => {
        props.onChange(e);
    }

    // show filter dropdownmenu
    const openFilter = () => {
        if (dropDownMenu.display === 'none')
            setDropDownMenu({display : 'flex'});
        else
            setDropDownMenu({display: 'none'});
    }

    // hide dropdownmenu when clicking outside component
    const handleClick = e => {
        if (node.current.contains(e.target)) {
            // inside clic
            return;
        }
        // outside click 
        setDropDownMenu({display: 'none'});
    };
    // hide dropdownmenu when clicking outside component
    const handleHideDropdown = (event) => {
        if (event.key === 'Escape') {
            setDropDownMenu({display: 'none'});
        }
    };

    // collect the event listener for the drop down menu
    useEffect(() => {
        document.addEventListener('keydown', handleHideDropdown, true);
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener('keydown', handleHideDropdown, true);
            document.removeEventListener("mousedown", handleClick);
        };
    },[]);

    return (
        <div className="headerComponent" ref={node}>
            <div className="navbar" >
                <Link to={'/home'} className="link" >
                    <p>Home</p>
                </Link>
                <div className="filter" onClick={()=>openFilter()}>
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
            <div className="sequenceContainer" style={dropDownMenu}>
                <div className="sequence">
                    <h4>Sequence</h4>
                    <input type="number" name="offset" defaultValue={0} onChange={handleChange}/>
                    <p>to</p>
                    <input type="number" name="limit" defaultValue={20} onChange={handleChange}/>
                </div>
                <p className="message">{props.message}</p>
                <div className="buttonFilter">
                    <Button onClick={props.onClick}>
                        <p>Search</p>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Header
