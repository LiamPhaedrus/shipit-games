import React, { Component }  from 'react';

const PlayerComponent = (props) => {
  let image = ""
  if (props.card) {
    image = <img src={props.card.image} />
  }
  return (
    <div className={props.hand}>
      <h3>{props.name}</h3>
      {image}
      <p>Cards Left: {props.pileSize}</p>
    </div>
  )
}

export default PlayerComponent
