import React, { useState } from 'react'
import Modal from '../Modal/Modal';

const CardModal = ({children, pokemon}) => {


    // Modal Hook
    const [active, setActive] = useState(false);
    const toggle = () => {
        setActive(!active)
    } 
    
    return (
        <div className="cardModalComponent" >
            <div onClick={()=>toggle()}>{children}</div>
            <Modal active={active} toggle={()=>toggle()}>
                <div className="cardModalContainer">
                    hola
                </div>
            </Modal>
        </div>
    )
}

export default CardModal
