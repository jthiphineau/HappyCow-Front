import React from "react";
import { Link } from "react-router-dom";

const Card = props => {
  // console.log(props.data);
  const { name, adress, description, thumbnail, placeId } = props.data;
  return (
    <Link to={`/establishment/${placeId}`} className="card">
      <div className="picture">
        <img src={thumbnail} alt={name}></img>
      </div>
      <div className="card-infos">
        <p>{name}</p>
        <p>{adress}</p>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default Card;
