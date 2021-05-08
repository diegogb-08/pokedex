import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { POKEAPI } from '../../tools/apiPaths'
import Header from '../Header/Header'

const Color = () => {

    const [colors, setColors] = useState([]);
    const [pokemons, setPokemons] = useState([]);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    console.log(pokemons)

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

    const handleSelected = async (e) =>{

        setPokemons([]);
        
        try{
            let result = await axios.get(e.target.value)
            if(result.data)
                result.data.pokemon_species.map(async pokemon => {
                    
                    let result = await axios.get(pokemon.url)
                    if(result.data)
                        setPokemons(pokemons => [...pokemons, result.data]);
                })
        }catch(err){

        }
    };


    return (
        <div className="colorComponent" >
            <div className="colorContainer">
                <Header/>
                <div className="whiter"></div>
                <div className="spacer"></div>
                <select name="colorSelector" className="colorSelector" onChange={handleSelected}>
                    <option value="" defaultValue>Select a color</option>
                    {
                        colors?.map((color,i)=>{
                            return (
                                <option value={color.url} key={i}>{color.name}</option>
                            )
                        })
                    }
                </select>
                

            </div>
        </div>
    )
};

export default Color;
