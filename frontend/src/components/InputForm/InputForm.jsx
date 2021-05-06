import React from 'react'

function InputForm(props) {
    return (
        <div className="inputComponent">
            <input 
                className="inputText"
                type={props.type}
                name={props.name}
                maxLength={props.length}
                onChange={props.onChange}
                onKeyDown={props.onKeyDown}
                value={props.value}
                style={props.style}
                required
            ></input>
            <span className="floating-label" >{props.title}</span>
            {props.showHide && 
                <div className="iconInput" onClick={props.onClick}>{props.showHide}</div>
            }
            {!props.showHide && 
                <div className="spacerCorrector" ></div>
            }
            <span className="error">{props.error}</span>
        </div>
    )
}

export default InputForm
