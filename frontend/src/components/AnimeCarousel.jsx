import React, { useEffect, useState } from "react";
import { getTopAnime } from "../api/anime";
import "./AnimeCarousel.css";

const AnimeCarousel = () => {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const data = await getTopAnime();
        setAnimeList(data.slice(0, 6));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnime();
  }, []);

  const cards = [...animeList, ...animeList];
  
  return (
    <div className="carousel-container">
      <div className="carousel-track">
        {cards.map((anime, index) => (
          <div key={index} className="anime-card">
            <img
              src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
              alt={anime.title}
            />
            <div className="anime-card-info">
              <h3>{anime.title}</h3>
              <p>⭐ {anime.score}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeCarousel;