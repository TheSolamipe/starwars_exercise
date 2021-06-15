import React from "react";
import Marquee from "react-fast-marquee";
import CharacterItem from "./CharacterItem";
import {useState, useEffect} from 'react';
import axios from 'axios';
import { AscendingSort, DescendingSort, FilterHandler } from "../../utils/sortandfilter";

const MovieItem = (movie)=>{
    const movieData = movie?.movie[0]
    console.log(movieData)

    const [characterList, setCharacterList] = useState([]);
    const [clicked, setClicked] = useState(false);


useEffect(() => {
    const getCharacter = async () => {
        const promiseArray = [];

        for(let i =0 ; i< movieData?.characters?.length ; i++){
           let characterLink = movieData?.characters[i]
           characterLink = characterLink.substring(0,4) + "s" + characterLink.substring(4, characterLink.length);
            promiseArray.push(axios(`${characterLink}`))
        }

        const results = await Promise.all(promiseArray);
       
        const newResults = results.map(({data}) => data);
        console.log(newResults);
        setCharacterList(newResults);
    }


    getCharacter();
}, [movieData])
    

    // const characterSetter = ()=>{
    //     if(clicked === false){setClicked(true)}
    //     else{ setClicked(false)}
    // }
    // const handleClick = async ()=>{
    //    await characterSetter()
    // }

    // useEffect(()=>{
    //     setCharacterList(AscendingSort(characterList, "name"))
    // },[setClicked, setCharacterList])

    let totalHeight = 0;
    for(let i=0; i < characterList?.length; i++){
        if(!isNaN(characterList[i]?.height)){
            totalHeight += parseInt(characterList[i]?.height)
        }
        else{
            totalHeight += 0
        }
    }
    
    let totalinFeet = totalHeight * 0.0328084
    const feetValue = Math.trunc(totalinFeet)
    const inchesValue = ((totalinFeet - feetValue) * 12).toFixed(2)
    
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
							<td className=" font-bold lg:text-xl md:text-sm text-xs">Total Heights: {totalHeight}cm({feetValue}ft/{inchesValue}in)</td>
						</tr>
						</tbody>
					</table>
        </div>
    )
}

export default MovieItem