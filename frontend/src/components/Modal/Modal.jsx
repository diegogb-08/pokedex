import React, { Component } from 'react'
import Portal from '../../Portal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes} from '@fortawesome/free-solid-svg-icons'

export default class Modal extends Component {

    render() {
        const x = <FontAwesomeIcon icon={faTimes} />
        const {children, toggle, active } = this.props
        
        return (
            <Portal>
                {active && (
                    <div style={styles.wrapper}>
                        <div style={styles.window}>
                            <div style={styles.closeBtn} onClick={toggle}>{x}</div>
                            <div>{children}</div>
                        </div>
                        <div onClick={toggle} style={styles.background} />
                    </div>
                )}
            </Portal>
        )
    }
}

const styles = {
    wrapper: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height:'100vh',
        zIndex: 1000,
    },
    window: {
        position: 'relative',
        borderRadius: 5,
        boxShadow: '2px 2px 10px rgba(0,0,0,0.2)',
        zIndex: 1000,
        minWidth: 250,
        minHeight: 100,
        backgroundColor: 'white'
    },
    closeBtn: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '1.5rem',
        height: '1.5rem',
        top: 5,
        right: 5,
        borderRadius: '5rem',
        cursor: 'pointer',
        marginRight: '0.5rem',
        marginTop: '0.3rem',
        color: 'white',
        backgroundColor: '#777777c2',
        zIndex: 99
    },

    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        backgroundColor: '#000',
        opacity: 0.8,
        cursor: 'pointer',
        zIndex: 1,
    }
}