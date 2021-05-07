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
        limit: 20
    })

    const [locations, setLocations] = useState([])
    const [url, setUrl] = useState('')
    console.log(url)
    console.log(locations)

    useEffect(()=>{
        getLocations()
    })


    const handleChange = (value) => {
        console.log(value)
        setUrl(value)
    }


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
                    <FontAwesomeIcon icon={faArrowAltCircleLeft}  className="arrow" onClick={()=>nextPage(-20)}/>

                        <select name="locations" onChange={handleChange}>
                            {
                                locations?.map(area => {
                                    console.log(area)
                                    return (
                                        <>
                                            <option value={area.url}>{area.name}</option>
                                        </>
                                    )
                                })
                            }
                        </select>

                    <FontAwesomeIcon icon={faArrowAltCircleRight} className="arrow" onClick={()=>nextPage(20)}/>

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
