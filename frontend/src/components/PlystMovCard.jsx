import React from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const PlystMovCard = ({
  movie: { imdbID, Year, Poster, Title, Type }, setFavMovies }) => {
  // const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();


  const deleteFavmovie = async (imdbID,setFavMovies) => {
    const activeUser = JSON.parse(localStorage.getItem("user-moviesproj"));
    const userId = activeUser?._id; 

    if (!userId) {
      console.log("User not logged in");
      return;
    }

    try {
      const response = await fetch(`https://moviemernbackend.onrender.com/api/users/favorites/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          imdbID,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Movie removed from favorites", data.favorites);
        setFavMovies((prevMovies) => prevMovies.filter(movie => movie.imdbID !== imdbID));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error removing movie from favorites", error);
    }
  };
  const handlePlaylistDelete = async (imdbID) => {
    if (confirm("Do you want to remove from Playlist?")) {
      await deleteFavmovie(imdbID,setFavMovies);
      console.log("Deleted");
    } else {
      console.log("Not deleted");
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
        <h3 onClick={handleTitleClick} style={{ cursor: "pointer" }}>
          {Title}
        </h3>
        <span
          style={{
            position: "absolute",
            right: "15px",
            top: "40px",
            fontSize: "20px",
            cursor: "pointer",
          }}
          onClick={() => handlePlaylistDelete(imdbID)}
        >
          <DeleteIcon />
        </span>
      </div>
    </div>
  );
};

export default PlystMovCard;
