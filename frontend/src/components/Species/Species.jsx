import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { POKEAPI } from '../../tools/apiPaths';
import Header from '../Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import CardModal from '../CardModal/CardModal';
import PokeCard from '../PokeCard/PokeCard';
import ProgressBar from '../ProgressBar/ProgressBar';

const Species = () => {

    const [filter, setFilter] = useState({
        offset: 0,
        limit: 10
    })

    const [species, setSpecies] = useState([])
    const [selected, setSelected] = useState({});
    const [loading, setLoading] = useState(false)
    const [pokemon, setPokemon] = useState([])

    
    // Initialize the view with the locations
    useEffect(()=>{
        getSpecies()
    // eslint-disable-next-line
    },[])

     // once the pokelist State is full then we dispatch everything to redux state
     useEffect(()=>{

        setTimeout(()=>{
            setLoading(false)
        },2000)
    // eslint-disable-next-line
    },[pokemon])


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

    const selectKind = async (kind,i) =>{
        setSelected({[i]:{backgroundColor: '#89d81b'}});
        setPokemon([]);
        setLoading(true);
        
        try{
            let result = await axios.get(POKEAPI+'pokemon/'+kind.name)
            setPokemon([result.data])
            console.clear()
        }catch(err){

        }
    }

    // It gets the percentage to be loaded by the loading bar and it returns a rounded number
    const getLoadingPercentage = (length) => {

        let percentage = (length / pokemon.length)*100
        return Math.round(percentage)
    }

    return (
        <div className="speciesComponent">
            <div className="speciesContainer">
                <Header/>
                <div className="whiter"></div>
                <div className="spacer"></div>
                <h2 className="title">CHOOSE SPECIES</h2>
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

                {
                    loading ?
                    <>
                        <div className="progressLoading">
                            <h1>Loading Pokemons...</h1>
                            <ProgressBar done={getLoadingPercentage(pokemon.length)}/>
                        </div>
                    </>

                    :
                    <>
                        {
                            pokemon.length > 0 ?
                            <>
                                <div className="spacer"></div>
                                <div className="spacer"></div>
                                <div className="spacer"></div>
                                <CardModal pokemon={pokemon[0]} >
                                    <PokeCard pokemon={pokemon[0]} />
                                </CardModal>

                            </>
                            : null
                        }

                    </>
                  
                }
            </div>
        </div>
    )
}

export default Species
