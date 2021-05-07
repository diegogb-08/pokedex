import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { ADD } from '../../redux/types/pokemonType';
import { POKEAPI } from '../../tools/apiPaths';
import CardModal from '../CardModal/CardModal';
import Header from '../Header/Header';
import PokeCard from '../PokeCard/PokeCard';
import ProgressBar from '../ProgressBar/ProgressBar';

const Home = (props) => {

    const [pokemons, setPokemons] = useState([])

    const [loading, setLoading] = useState(false)

    const [filter, setFilter] = useState({
        offset: 0,
        limit: 20
    })

    console.log(filter)
    function handleChange(e) {
        setFilter({...filter, [e.target.name]: e.target.value, [e.target.name]: e.target.value});
    }

    // First mount it will make the call to the api
    useEffect(()=>{
        getList()
        // eslint-disable-next-line
    },[])

    // once the pokelist State is full then we dispatch everything to redux state
    useEffect(()=>{

        if(pokemons.length === 20)
            props.dispatch({type: ADD, payload: pokemons})
            setTimeout(()=>{
                setLoading(false)
            },2000)
        // eslint-disable-next-line
    },[pokemons])



    // Only makes the call the first time is mounted, after will check props before making the call to prevent excessive calls
    const getList = async () => {
     
            setLoading(true)
            let result = await axios.get(POKEAPI+`pokemon?offset=${filter.offset}&limit=${filter.limit}`)
            console.log(result.data)
            if(result.data){
                result.data.results.map(async pokemon => {
                    let result = await axios.get(pokemon.url)

                    setPokemons(pokemons => [...pokemons, result.data])

                })
            }

    }

    // It gets the percentage to be loaded by the loading bar and it returns a rounded number
    const getLoadingPercentage = (length) => {

        let percentage = (length / 20)*100
        return Math.round(percentage)
    }

    return (
        <div className="homeComponent">
            <div className="homeContainer">
                <Header onChange={handleChange}/>
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>
                <div className="spacer"></div>
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
                        <div className="grid">
                            {
                                props.pokeList.map(pokemon => {

                                    return <CardModal pokemon={pokemon} key={pokemon.id}>
                                                <PokeCard pokemon={pokemon} key={pokemon.id}/>
                                            </CardModal>
                                })
                            }
                        </div>
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

export default connect(mapStateToProps)(Home); 
