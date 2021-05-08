import React from 'react'
import { connect } from 'react-redux'

const Battle = (props) => {


    return (
        <div className="battleComponent">
            <div className="battleContainer">
                
            </div>
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        compareList: state.pokemonReducer.compareList,
    }
}

export default connect(mapStateToProps)(Battle) 
