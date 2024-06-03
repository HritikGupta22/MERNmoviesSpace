import React from "react";
import { AddIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {
  // const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const addFavmovie = async (newMovie) => {
    const activeuser = JSON.parse(localStorage.getItem("user-moviesproj"));
    const userId = activeuser._id; 
    if (!userId) {
      console.log("User not logged in");
      return;
    }

    const plainMovie = {
      imdbID: newMovie.imdbID,
      Year: newMovie.Year,
      Poster: newMovie.Poster,
      Title: newMovie.Title,
      Type: newMovie.Type,
    };

    console.log("Adding to favorites:", plainMovie);

    try {
      const response = await fetch(`https://moviemernbackend.onrender.com/api/users/favorites/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          movie: plainMovie,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Movie added to favorites", data.favorites);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error adding movie to favorites", error);
    }
  };

  const handleplaylistclick = async () => {
    const favMovie = {
      imdbID,
      Year,
      Poster,
      Title,
      Type,
    };

    if (confirm("Do you want to save in the Playlist")) {
      await addFavmovie(favMovie);
      console.log("saved");
    } else {
      console.log("not saved");
    }
  };

  const handleTitleClick = () => {
    navigate(`/moviesdetails/${imdbID}`);
  };

  return (
    <div className="movie" key={imdbID}>
      <div>
        <p>{Year}</p>
      </div>

      <div>
        <img
          src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/400"}
          alt={Title}
        />
      </div>

      <div>
        <span>{Type}</span>
        <h3 onClick={handleTitleClick} style={{ cursor: 'pointer' }}>{Title}</h3>
        <span style={{ position: 'absolute', right: '15px', top: '40px', fontSize:'20px', cursor:"pointer" }} onClick={handleplaylistclick}>
          <AddIcon />
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
