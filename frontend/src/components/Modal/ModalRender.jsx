import React from 'react'
import Modal from './Modal';
import {useState} from 'react';

function ModalRender(props) {

    // Modal Hook
    const [active, setActive] = useState(false);
    const toggle = () => {
        setActive(!active)
    } 
    
    

    

    return (
        <div>
            <div className="configComponent" onClick={()=>toggle()}>{props.children}</div>
                <Modal active={active} toggle={()=>toggle()}>


                </Modal>
        </div>
    )
}

export default ModalRender;
