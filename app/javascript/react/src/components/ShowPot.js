import React, { Component }  from 'react';

const ShowPot = (props) => {

  let cards = ""
  if (props.cards.length >= 1) {
    cards = props.cards.map(card => {
      return(
        <img src={card.image} key={card.code} />
      )
    })
  }


  return (
    <div className='show-pot'>
      {cards}
    </div>
  )
}

export default ShowPot
