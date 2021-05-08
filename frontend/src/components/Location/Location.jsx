import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { POKEAPI } from '../../tools/apiPaths'
import Header from '../Header/Header'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons'
import ProgressBar from '../ProgressBar/ProgressBar'
import CardModal from '../CardModal/CardModal'
import PokeCard from '../PokeCard/PokeCard'

const Location = (props) => {


    const [filter, setFilter] = useState({
        offset: 0,
        limit: 10
    })

    const [locations, setLocations] = useState([])
    const [selected, setSelected] = useState({});
    const [loading, setLoading] = useState(false)
    const [pokemons, setPokemons] = useState([])
    
    // Initialize the view with the locations
    useEffect(()=>{
        getLocations()
    // eslint-disable-next-line
    },[])

    // once the pokelist State is full then we dispatch everything to redux state
    useEffect(()=>{

            setTimeout(()=>{
                setLoading(false)
            },2000)
        // eslint-disable-next-line
    },[pokemons])


    const getLocations = async () => {

        try{

            let result = await axios.get(POKEAPI+`location-area/?offset=${filter.offset}&limit=${filter.limit}`)
            if (result.data)
                setLocations(result.data.results)
        }catch(err){

        }
    }

    // Change the offset to bring next page of locations
    const nextPage = (value) => {
        
        if((filter.offset + value) > -1){
            setFilter({...filter, offset: filter.offset + value})
            setSelected({});
            setLocations([])
            getLocations()
        }
    } 

    // Change color of selected area and call the api to bring the details of the choosen area
    const selectArea = async (area, i) => {
        setSelected({[i]:{backgroundColor: '#89d81b'}});
        setLoading(true);
        setPokemons([]);

        try{
            let result = await axios.get(area.url)
            if(result.data)
                result.data.pokemon_encounters.map(async pokemon => {

                    let result = await axios.get(pokemon.pokemon.url)
                    if(result.data)
                        setPokemons(pokemons => [...pokemons, result.data]);
                });
        }catch(err){

        }
    }

    // It gets the percentage to be loaded by the loading bar and it returns a rounded number
    const getLoadingPercentage = (length) => {

        let percentage = (length / pokemons.length)*100
        return Math.round(percentage)
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
                <h2 className="title">CHOOSE AREA</h2>
                <div className="filterLocation">
                    <FontAwesomeIcon icon={faArrowAltCircleLeft}  className="arrow" onClick={()=>nextPage(-10)}/>
                    <div className="areaCollection">
                        {
                            locations?.map((area, i) => {
                                return (<div className="area" key={i} onClick={()=>selectArea(area,i)} style={selected[i]}>
                                            <p>{area.name}</p>
                                        </div>
                                )       
                            })
                        }
                    </div>
                    <FontAwesomeIcon icon={faArrowAltCircleRight} className="arrow" onClick={()=>nextPage(10)}/>
                </div>

                    {
                        loading ?
                        <>
                            <div className="progressLoading">
                                <h1>Loading Pokemons...</h1>
                                <ProgressBar done={getLoadingPercentage(pokemons.length)}/>
                            </div>
                        </>

                        :
                        <>
                            {
                                pokemons.length > 0 ?
                                <>
                                    <div className="grid">
                                        {
                                            pokemons.map((pokemon, i) => {

                                                return <CardModal pokemon={pokemon} key={i}>
                                                            <PokeCard pokemon={pokemon} key={i}/>
                                                        </CardModal>
                                            })
                                        }
                                    </div>

                                </>
                                : null
                            }
                        </>
                    }

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
