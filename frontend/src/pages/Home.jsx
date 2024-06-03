import React from 'react'
import Header from '../components/Header.jsx'
import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard.jsx";
import SearchIcon from "./search.svg";

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=407c1969";

const Home  = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const storedMovies = localStorage.getItem("movies");
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies));
    } else {
      searchMovies("Batman");
    }
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
    localStorage.setItem("movies", JSON.stringify(data.Search));
    localStorage.setItem("searchTerm", title);
  };
  return (
    <>
    <Header />  
    <div className="app">

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
         src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container-home">
          {movies.map((movie,index) => (
            <MovieCard movie={movie} key={index}/>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
   
    </>
  
  )
}

export default Home;
