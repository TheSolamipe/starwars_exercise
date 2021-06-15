import React, {useState} from 'react';
import { WrappedSelect } from '../inputField/SelectInput';
import MovieItem from './MovieItem';

const Movie =(movies) =>{
    const [selectedMovie, setSelectedMovie] = useState("");

    const changeHandler = e => {
        const targetEl = e.target;
        setSelectedMovie( targetEl.value);
      };
      const movieNames = [];
      if(movies?.movies !== null){
          for(let i=0 ; i < movies?.movies.length ; i++){
              movieNames.push(movies?.movies[i].title)
          }
      }
      console.log(movieNames)
      const selectedMovieDetails = [];
      if(selectedMovie !== ""){
        for(let i=0 ; i < movies?.movies.length ; i++){
          (movies?.movies[i].title === selectedMovie) && selectedMovieDetails.push(movies?.movies[i])
        }
      }

    return(
        <div>
            <WrappedSelect
                 options={movieNames}
                 name='movie'
                 value={selectedMovie}
                 placeholder='Select Movie'
                 onChange={changeHandler}
            />
            {selectedMovie !== "" ? 
                <MovieItem movie={selectedMovieDetails}/>
            : <div className="mt-32"><img src="../../Star_Wars_logo-1.png" alt="star war" /></div>
            }
        </div>
    )
}

export default Movie