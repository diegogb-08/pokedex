import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { POKEAPI } from '../../tools/apiPaths';

const Home = () => {

    const [list, setList] = useState([]);
    console.log(list)


    useEffect(()=>{
        getList()
    },[])


    const getList = async () => {

        let result = await axios.get(POKEAPI+'pokemon?offset=40&limit=40')

        if(result.data){
            result.data.results.map(async pokemon => {
                let result = await axios.get(pokemon.url)
                setList(list => [...list, result.data])
            })
    }

}


    return (
        <div className="homeComponent">
            this is home
        </div>
    )
}

export default Home
