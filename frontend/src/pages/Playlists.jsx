import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import PlystMovCard from '../components/PlystMovCard.jsx';

const Playlists = () => {
  const [favMovies, setFavMovies] = useState([]);


  const fetchFavoriteMovies = async() => {
    const activeUser = JSON.parse(localStorage.getItem("user-moviesproj"));
    const userId = activeUser?._id; 

    if (!userId) {
      console.log("User not logged in");
      return;
    }

    try {
      const response = await fetch(`https://moviemernbackend.onrender.com/api/users/favorites/${userId}`);
      
      if (!response.headers.get('content-type')?.includes('application/json')) {
        throw new Error('Response is not JSON');
      }

      const data = await response.json();

      if (response.ok) {
        setFavMovies(data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.error("Error fetching favorite movies:", error);
      setFavMovies([]);
    }
  };

  useEffect(() => {
    fetchFavoriteMovies();
  }, []);

  return (
    <>
      <Header />
      <div className="app">
        {favMovies.length > 0 ? (
          <div className="container-home">
            {favMovies.map((movie, index) => (
              <PlystMovCard
                key={index}
                movie={movie}
                setFavMovies={setFavMovies}
              />
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default Playlists;
