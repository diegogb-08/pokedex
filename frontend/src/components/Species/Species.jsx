import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { POKEAPI } from '../../tools/apiPaths';
import Header from '../Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';

const Species = () => {

    const [filter, setFilter] = useState({
        offset: 0,
        limit: 10
    })

    const [species, setSpecies] = useState([])
    const [selected, setSelected] = useState({});
    const [loading, setLoading] = useState(false)
    const [pokemons, setPokemons] = useState([])
    
    // Initialize the view with the locations
    useEffect(()=>{
        getSpecies()
    // eslint-disable-next-line
    },[])


    const getSpecies = async () => {

        try{
            let result = await axios.get(POKEAPI+`pokemon-species/?offset=${filter.offset}&limit=${filter.limit}`)
            if (result.data)
                setSpecies(result.data.results)

        }catch(err){

        }
    }

    // Change the offset to bring next page of locations
    const nextPage = (value) => {
        
        if((filter.offset + value) > -1){
            setFilter({...filter, offset: filter.offset + value})
            setSelected({});
            setSpecies([])
            getSpecies()
        }
    } 

    const selectKind = (kind,i) =>{
        setSelected({[i]:{backgroundColor: '#89d81b'}});
        // setLoading(true);
        // setPokemons([]);
    }

    return (
        <div className="speciesComponent">
            <div className="speciesContainer">
                <Header/>
                <div className="whiter"></div>
                <div className="spacer"></div>
                <h2 className="title">CHOOSE AREA</h2>
                <div className="filterSpecies">
                    <FontAwesomeIcon icon={faArrowAltCircleLeft}  className="arrow" onClick={()=>nextPage(-10)}/>
                    <div className="kindCollection">
                        {
                            species?.map((kind, i) => {
                                return (<div className="kind" key={i} onClick={()=>selectKind(kind,i)} style={selected[i]}>
                                            <p>{kind.name}</p>
                                        </div>
                                )       
                            })
                        }
                    </div>
                    <FontAwesomeIcon icon={faArrowAltCircleRight} className="arrow" onClick={()=>nextPage(10)}/>
                </div>

            </div>
        </div>
    )
}

export default Species
