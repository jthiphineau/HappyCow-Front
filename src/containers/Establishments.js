import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

import Card from "../components/Card";

const Establishments = () => {
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await axios.get(
      `https://res.cloudinary.com/lereacteur-apollo/raw/upload/v1575242111/10w-full-stack/Scraping/restaurants.json`
    );
    setData(response.data);
  };

  const fetchData = async () => {
    const response = await axios.get(
      `https://res.cloudinary.com/lereacteur-apollo/raw/upload/v1575242111/10w-full-stack/Scraping/restaurants.json`
    );
    setData(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <div className="wave-container">
        <h1>Trouver des établlissements végétariens à proximité</h1>
        <div className="search-bar">
          <form onSubmit={handleSubmit}>
            <div className="search-input">
              <input
                onChange={e => setSearchInput(e.target.value)}
                placeholder="Rechercher une ville, une région ou un code postal"
                type="text"
              />
            </div>

            <button className="button-search">
              <FontAwesomeIcon
                className="form-search-icon"
                icon="search"
                size="2x"
              />
            </button>
          </form>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="white"
            fillOpacity="1"
            d="M0,224L60,208C120,192,240,160,360,154.7C480,149,600,171,720,197.3C840,224,960,256,1080,250.7C1200,245,1320,203,1380,181.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div
        style={{
          marginTop: "-40px"
        }}
      >
        <h2>Nourriture végétalienne à Paris</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : data.length > 0 ? (
          <div
            style={{
              display: "flex",
              overflowX: "scroll",
              width: "1080px"
            }}
          >
            {data.map((elem, index) => {
              return (
                (elem.category === 0 ||
                  elem.category === 3 ||
                  elem.category === 6 ||
                  elem.category === 10 ||
                  elem.category === 12 ||
                  elem.category === 13) && (
                  <div className="establishment-list" key={index}>
                    <Card key={index + "a"} data={elem} />
                  </div>
                )
              );
            })}
          </div>
        ) : (
          <div>Aucun établlissement pour le moment</div>
        )}
      </div>
      <div>
        <h2>Magasin à Paris</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : data.length > 0 ? (
          <div
            style={{
              display: "flex",
              overflowX: "scroll",
              width: "1080px"
            }}
          >
            {data.map((elem, index) => {
              return (
                (elem.category === 1 ||
                  elem.category === 2 ||
                  elem.category === 11) && (
                  <div className="establishment-list" key={index + "b"}>
                    <Card key={index} data={elem} />
                  </div>
                )
              );
            })}
          </div>
        ) : (
          <div>Aucun magasin pour le moment</div>
        )}
      </div>
      <div>
        <h2>Hotel, Cosmétiques et d'autres à Paris</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : data.length > 0 ? (
          <div
            style={{
              display: "flex",
              overflowX: "scroll",
              width: "1080px"
            }}
          >
            {data.map((elem, index) => {
              return (
                (elem.category === 4 ||
                  elem.category === 5 ||
                  elem.category === 7 ||
                  elem.category === 14 ||
                  elem.category === 99) && (
                  <div className="establishment-list" key={index + "b"}>
                    <Card key={index} data={elem} />
                  </div>
                )
              );
            })}
          </div>
        ) : (
          <div>Aucun magasin pour le moment</div>
        )}
      </div>
    </div>
  );
};

export default Establishments;
