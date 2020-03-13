import React from "react";
import { Link } from "react-router-dom";

const Card = props => {
  // console.log(props.data);
  const { name, address, type, thumbnail, placeId } = props.data;
  return (
    <Link to={`/establishment/${placeId}`} className="card">
      <div className="picture">
        <img src={thumbnail} alt={name}></img>
      </div>
      <div className="card-infos">
        <h3>{name}</h3>
        <p>{address}</p>
        <p>{type}</p>
      </div>
    </Link>
  );
};

export default Card;
