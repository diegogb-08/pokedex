import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { ADD } from '../../redux/types/pokemonType';
import { POKEAPI } from '../../tools/apiPaths';
import Header from '../Header/Header';
import ProgressBar from '../ProgressBar/ProgressBar';

const Home = (props) => {

    const [pokemons, setPokemons] = useState([])

    const [loading, setLoading] = useState(false)

    // First mount it will make the call to the api
    useEffect(()=>{
        getList()
        // eslint-disable-next-line
    },[])

    // once the pokelist State is full then we dispatch everything to redux state
    useEffect(()=>{

        if(pokemons.length === 75)
            props.dispatch({type: ADD, payload: pokemons})
            setTimeout(()=>{
                setLoading(false)
            },200)
        // eslint-disable-next-line
    },[pokemons])



    // Only makes the call the first time is mounted, after will check props before making the call to prevent excessive calls
    const getList = async () => {

        if(props.pokeList.length === 0){
    
            setLoading(true)
            let result = await axios.get(POKEAPI+'pokemon?offset=75&limit=75')

            if(result.data){
                result.data.results.map(async pokemon => {
                    let result = await axios.get(pokemon.url)

                    setPokemons(pokemons => [...pokemons, result.data])

                })
            }
        }
    }

    // It gets the percentage to be loaded by the loading bar and it returns a rounded number
    const getLoadingPercentage = (length) => {

        let percentage = (length / 75)*100
        return Math.round(percentage)
    }


    console.log(props.pokeList)
    return (
        <div className="homeComponent">
            {
                loading ?
                <>
                    <div className="progressLoading">
                        <h2>Loading pokemons...</h2>
                        <ProgressBar done={getLoadingPercentage(pokemons.length)}/>
                    </div>

                </>
                :
                <>
                    <div className="homeContainer">
                        <Header/>
                        <div className="spacer"></div>
                        <div className="spacer"></div>
                        <div className="spacer"></div>
                        <div className="spacer"></div>
                        <div className="spacer"></div>
                        Aqui metemos el resto de cosas
                    </div>
                </> 
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
      pokeList: state.pokemonReducer.pokeList,
    }
}

export default connect(mapStateToProps)(Home); 
