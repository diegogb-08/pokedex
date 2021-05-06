import React from 'react'

function Button(props) {
    return (
        <div className="buttonComponent" onClick={props.onClick} >
            {props.children}
        </div>
    )
}

export default Button
