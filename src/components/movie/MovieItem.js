import React from "react";
import Marquee from "react-fast-marquee";
import CharacterItem from "./CharacterItem";
// import {useState, useEffect} from 'react';
import axios from 'axios';

const MovieItem = (movie)=>{
    const movieData = movie?.movie[0]
    console.log(movieData)

    // const [characterList, setCharacterList] = useState([])

    let characterList = []
    async function getCharacter(){
        for(let i =0 ; i< movieData?.characters?.length ; i++){
            
             const result = await axios(
                `${movieData?.characters[i]}`
              );
             characterList.push(result?.data);  
        }
    }
    getCharacter();
    
    // setCharacterList(characterArray)
    console.log(characterList)
    
    return(
        <div className="lg:mt-6 mt-3">
            <Marquee className="lg:text-3xl md:text-2xl text-xl font-bold text-yellow-200 lg:p-8 p-4" pauseOnHover={true} gradient={false}>
                {movieData?.opening_crawl}
            </Marquee>
            <table className="w-full">
						<thead>
						<tr className="text-left border-2 border-yellow-200">
							<th className="text-yellow-200 lg:text-xl md:text-md text-xs" scope="col" >Name</th>
							<th className="text-yellow-200 lg:text-xl md:text-md text-xs" scope="col">Gender &#8597;</th>
							<th className="text-yellow-200 lg:text-xl md:text-md text-xs" scope="col">Height(cm)</th>
						</tr>
						</thead>
						<tbody>
						{ characterList?.length && (
							characterList?.map( character => (
								<CharacterItem key={ character?.name } character={ character } />
							) )
						) }
						{/*Total*/}
						<tr className="bg-gray-200 text-left">
							<td className=" font-bold lg:text-xl md:text-sm text-xs">No of characters: {characterList?.length}</td>
                            <td />
							<td className=" font-bold lg:text-xl md:text-sm text-xs">Total Heights: 500cm()</td>
						</tr>
						</tbody>
					</table>
        </div>
    )
}

export default MovieItem