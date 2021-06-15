import Movie from './components/movie/Movie';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

  const [movies, setMovies] = useState([]);

  useEffect(()=>{
    async function getMovies(){
      const result = await axios(
        `${process.env.REACT_APP_BASE_URL}/films/`
      );
      setMovies(result?.data?.results);
    }
    getMovies();
  }, [])


  return (
    <div className="text-center bg-black h-screen flex flex-col items-center justify-between pt-10">
      <div className="md:w-3/5 w-11/12"><Movie movies={movies}/></div>
    </div>
  );
}

export default App;
