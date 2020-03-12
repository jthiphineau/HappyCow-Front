import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

const Establishment = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);

  const finder = new Icon({
    iconUrl: "/iconfinder-marker.svg",
    iconSize: [40, 40]
  });

  useEffect(() => {
    // console.log(id);
    const fetchData = async () => {
      let newTab = [];
      try {
        const response = await axios.get(
          `https://res.cloudinary.com/lereacteur-apollo/raw/upload/v1575242111/10w-full-stack/Scraping/restaurants.json`
        );
        for (let i = 0; i < response.data.length; i++) {
          if (String(response.data[i].placeId) === id) {
            // console.log(response.data[i]);
            setData(response.data[i]); // j’ai stocké dans un state les données d’un seul resto // resto retrouvé grâce à l’Id
            // console.log(response.data[i].nearbyPlacesIds);

            for (let y = 0; y < response.data[i].nearbyPlacesIds.length; y++) {
              const response2 = await axios.get(
                `https://res.cloudinary.com/lereacteur-apollo/raw/upload/v1575242111/10w-full-stack/Scraping/restaurants.json`
              );

              for (let z = 0; z < response2.data.length; z++) {
                if (
                  response2.data[z].placeId ===
                  response.data[i].nearbyPlacesIds[y]
                ) {
                  newTab.push(response2.data[z].location);
                }
                //je boucle sur l'API pour trouver l'id correspondant au resultat obtenu au dessus.
                // console.log(response2.data[z].location);
              }
            }
          }
        }
        console.log(newTab);
        setLocations(newTab); //je stock le tableau des locations pour chaque établissement.
        //chercher dans response.data
        setIsLoading(false);
      } catch (e) {
        console.log("Fetching data failed");
      }
    };
    fetchData();
  }, [id]);

  return isLoading ? (
    <div className="wrapper">Loading...</div>
  ) : (
    <div className="establishment-container">
      <div className="title">
        <div>
          <h1>{data.name}</h1>
          <div>
            <p>{data.type}</p>
            <p>{data.rating}</p>
          </div>
          <div>
            <button>Mise à jour</button>
            <button>Favoris</button>
            <button>Voyage</button>
            <button>Partager</button>
          </div>
        </div>
      </div>
      <div>
        <p>CONTACT</p>
        <p>{data.phone}</p>

        <p>TROUVER</p>
        <p>{data.address}</p>
        <p>{data.description}</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "red"
          }}
        ></div>
        <div
          className="img-gallery"
          // style={{
          //   backgroundColor: "blue",
          //   height: "100px",
          //   width: "100px",
          //   display: "flex",
          //   objectFit: "cover"
          // }}
        >
          <img src={data.pictures[0]} alt={1}></img>
          <img src={data.pictures[1]} alt={2}></img>
          <img src={data.pictures[2]} alt={3}></img>
        </div>
      </div>

      <div className="map">
        <Map center={[data.location.lat, data.location.lng]} zoom={15}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {locations.map((elem, index) => {
            return <Marker key={index} position={[elem.lat, elem.lng]} />;
          })}
          <Marker
            key={data.address}
            position={[data.location.lat, data.location.lng]}
            icon={finder}
          />
          <Popup position={[data.location.lat, data.location.lng]}>
            <div className="popup">
              <h3>{data.name}</h3>
              {data.type}
            </div>
          </Popup>
          )}
        </Map>
      </div>
    </div>
  );
};

export default Establishment;
