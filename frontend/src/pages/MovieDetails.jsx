import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { Flex } from '@chakra-ui/react';

const MovieDetails = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=407c1969&i=${imdbID}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details" style={{height:'100vh'}}>
        <Header />
      <Flex style={{margin:'4rem'}}>
      <img src={movie.Poster} alt={movie.Title}  />
      <div className="movie-details-content">
      <h3 style={{fontSize:'1.8rem', margin:'20px' , padding:'20px'}}>{movie.Title}</h3>
      <p style={{fontSize:'1.2rem',marginLeft:'13px'}}><strong>Year:</strong> {movie.Year}</p>
      <p style={{fontSize:'1.2rem',marginLeft:'13px'}}><strong>Type:</strong> {movie.Type}</p>
      <p style={{fontSize:'1.2rem',marginLeft:'13px'}}><strong>Genre:</strong> {movie.Genre}</p>
      <p style={{fontSize:'1.2rem',marginLeft:'13px'}}><strong>Director:</strong> {movie.Director}</p>
      <p style={{fontSize:'1.2rem',marginLeft:'13px'}}><strong>Actors:</strong> {movie.Actors}</p>
      <p style={{fontSize:'1.2rem',marginLeft:'13px'}}><strong>Language:</strong> {movie.Language}</p>
      <p style={{fontSize:'1.2rem',marginLeft:'13px'}}><strong>Country:</strong> {movie.Country}</p>
      <p style={{fontSize:'1.2rem',marginLeft:'13px'}}><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
      </div>
      </Flex>
      <h2 style={{fontSize:'1.5rem'}}><strong>Synopsis:</strong> {movie.Plot}</h2>
    </div>
  );
};

export default MovieDetails;
