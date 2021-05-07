import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { POKEAPI } from '../../tools/apiPaths'
import Header from '../Header/Header'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons'

const Location = (props) => {


    const [filter, setFilter] = useState({
        offset: 0,
        limit: 10
    })

    const [locations, setLocations] = useState([])
    const [area, setArea] = useState('')
    console.log("VALUE",area)

    const handleChange = (e) => {
        setArea(e.target.value)
    }

    useEffect(()=>{
        getLocations()
    })


    const getLocations = async () => {

        try{

            let result = await axios.get(POKEAPI+`location-area/?offset=${filter.offset}&limit=${filter.limit}`)
            if (result.data)
                setLocations(result.data.results)
        }catch(err){

        }
    }

    const nextPage = (value) => {

        if((filter.offset + value) > -1){
            setFilter({...filter, offset: filter.offset + value})
            setLocations([])
            getLocations()
        }
    } 


    return (
        <div className="locationComponent">
            <div className="locationContainer">
                <Header />
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="filterLocation">
                    <FontAwesomeIcon icon={faArrowAltCircleLeft}  className="arrow" onClick={()=>nextPage(-10)}/>

                        <select name="locations" onChange={handleChange}>
                            <option value="" defaultValue>Select area</option>
                            <option value={locations[0]?.url}>{locations[0]?.name}</option>
                            <option value={locations[1]?.url}>{locations[1]?.name}</option>
                            <option value={locations[2]?.url}>{locations[2]?.name}</option>
                            <option value={locations[3]?.url}>{locations[3]?.name}</option>
                            <option value={locations[4]?.url}>{locations[4]?.name}</option>
                            <option value={locations[5]?.url}>{locations[5]?.name}</option>
                            <option value={locations[6]?.url}>{locations[6]?.name}</option>
                            <option value={locations[7]?.url}>{locations[7]?.name}</option>
                            <option value={locations[8]?.url}>{locations[8]?.name}</option>
                            <option value={locations[9]?.url}>{locations[9]?.name}</option>
                        </select>

                    <FontAwesomeIcon icon={faArrowAltCircleRight} className="arrow" onClick={()=>nextPage(10)}/>

                </div>

            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
      pokeList: state.pokemonReducer.pokeList,
    }
}


export default connect(mapStateToProps)(Location) 
