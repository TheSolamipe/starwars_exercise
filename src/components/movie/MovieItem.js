import React from "react";
import Marquee from "react-fast-marquee";
import CharacterItem from "./CharacterItem";
import {useState, useEffect} from 'react';
import axios from 'axios';
import { AscendingSort, DescendingSort, FilterHandler } from "../../utils/sortandfilter";

const MovieItem = (movie)=>{
    const movieData = movie?.movie[0]
    

    const [characterList, setCharacterList] = useState([]);
    const [factor, setFactor] = useState('');
    const [clicked, setClicked] = useState(false);
    const [gender, setGender] = useState('');


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
        const filteredArray = FilterHandler(newResults, gender);
        const AscendingArray = AscendingSort(newResults, factor);
        const DescendingArray = DescendingSort(newResults, factor);
        if(gender){ 
            setCharacterList(filteredArray)
        }else if(clicked === true && factor){
            setCharacterList(AscendingArray)
        }else if(clicked === false && factor){
            setCharacterList(DescendingArray)
        }
        else{
            setCharacterList(newResults)
        }
    }


    getCharacter();
}, [movieData, gender, clicked, setClicked, factor])
    

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

    const handleChange =(e)=>{
        setGender(e.target.value)
    }

    const handleClick = ()=>{
        if(clicked === false){
            setClicked(true)
        }else{ setClicked(false)}
    }

    // console.log(clicked, factor)
    return(
        <div className="lg:mt-6 mt-3">
            <Marquee className="lg:text-3xl md:text-2xl text-xl font-bold text-yellow-200 lg:p-8 p-4" pauseOnHover={true} gradient={false}>
                {movieData?.opening_crawl}
            </Marquee>
            <table className="w-full">
						<thead>
						<tr className="text-left border-2 border-yellow-200">
							<th className="text-yellow-200 lg:text-xl md:text-md text-xs" scope="col" onClick={()=>{setFactor('name');handleClick();}}>Name</th>
							<th className="text-yellow-200 lg:text-xl md:text-md text-xs" scope="col" onClick={()=>{setFactor('gender');handleClick();}}>Gender</th>
							<th className="text-yellow-200 lg:text-xl md:text-md text-xs" scope="col" onClick={()=>{setFactor('height');handleClick();}}>Height(cm)</th>
						</tr>
                        <tr className="text-yellow-200 text-left md:text-xl text-xs"><th className="w-full">
                            Filter by Gender:</th>
                            <th><select value={gender} onChange={handleChange} className="bg-yellow-200 text-black">
                                <option value="">select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="n/a">N/A</option>
                                <option value="hermaphrodite">Hermophrodite</option>
                            </select>
                        </th></tr>
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