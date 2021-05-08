import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { POKEAPI } from '../../tools/apiPaths'
import CardModal from '../CardModal/CardModal';
import Header from '../Header/Header'
import PokeCard from '../PokeCard/PokeCard';
import ProgressBar from '../ProgressBar/ProgressBar';

const Color = () => {

    const [colors, setColors] = useState([]);
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(()=>{

        const getColors = async () => {
            
            try{
                let result = await axios.get(POKEAPI+'pokemon-color/')
                if(result.data)
                    setColors(result.data.results)
            }catch(err){
    
            }
        };

        getColors();
    },[]);

     // once the pokelist State is full then we dispatch everything to redux state
     useEffect(()=>{

        setTimeout(()=>{
            setLoading(false)
        },2000)
    // eslint-disable-next-line
    },[pokemons])

    const handleSelected = async (e) =>{

        setPokemons([]);
        setLoading(true);

        try{
            let result = await axios.get(e.target.value)
            if(result.data)
                result.data.pokemon_species.map(async pokemon => {
                    
                    let result = await axios.get(pokemon.url)

                        if(result.data){
                            let resultName = await axios.get(POKEAPI+'pokemon/'+result.data.name)
                            setPokemons(pokemons => [...pokemons, resultName.data]);
                            console.clear()
                        }    
                })
        }catch(err){
            
        }
    };

    // It gets the percentage to be loaded by the loading bar and it returns a rounded number
    const getLoadingPercentage = (length) => {

        let percentage = (length / pokemons.length)*100
        return Math.round(percentage)
    }


    return (
        <div className="colorComponent" >
            <div className="colorContainer">
                <Header/>
                <div className="whiter"></div>
                <div className="spacer"></div>
                <select name="colorSelector" className="colorSelector" onChange={handleSelected}>
                    <option value="" defaultValue>Select a pokemon color</option>
                    {
                        colors?.map((color,i)=>{
                            return (
                                <option value={color.url} key={i}>{color.name}</option>
                            )
                        })
                    }
                </select>
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
};

export default Color;
