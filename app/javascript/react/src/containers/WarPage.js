import React, { Component }  from 'react';
import { Link } from 'react-router'
import PlayerComponent from '../components/PlayerComponent'
import ShowPot from '../components/ShowPot'

const cardValues = {
  "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9,
  "10": 10, "JACK": 11, "QUEEN": 12, "KING": 13, "ACE": 14
}

class WarPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      deck: null,
      cards: null,
      player1Cards: [],
      player2Cards: [],
      player1Show: {},
      player2Show: {},
      message: "Let's have a war...",
      pot: []
    }
    this.handleFetchDeck= this.handleFetchDeck.bind(this)
    this.handleFetchCard = this.handleFetchCard.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  handleFetchDeck () {
    this.handleClear ()
    fetch(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({ deck: responseData})
    })
    .then(whee => {
      this.handleFetchCard()
    })
  }

  handleFetchCard () {
    fetch(`https://deckofcardsapi.com/api/deck/${this.state.deck.deck_id}/draw/?count=52`)
    .then(response => response.json())
    .then(responseData => {
      this.setState({
        cards: responseData.cards,
        player1Cards: responseData.cards.slice(0,26),
        player2Cards: responseData.cards.slice(26)
      })
    })
  }

  handleClear () {
    this.setState({
      deck: null,
      cards: null,
      player1Cards: [],
      player2Cards: [],
      player1Show: {},
      player2Show: {},
      message: "Let's have a war...",
      pot: []
    })
  }

  handlePlay () {
    let p1Cards = this.state.player1Cards
    let p2Cards = this.state.player2Cards
    this.setState({
      player1Show: p1Cards[0],
      player2Show: p2Cards[0],
      pot: []
    })

    if ( cardValues[p1Cards[0].value] > cardValues[p2Cards[0].value] ) {
      p1Cards.shift()
      p2Cards.shift()
      p1Cards.push(this.state.player1Show)
      p1Cards.push(this.state.player2Show)
      this.setState({
        player1Cards: p1Cards,
        player2Cards: p2Cards,
        message: "Player One Wins!",
      })
    } else if ( cardValues[p2Cards[0].value] > cardValues[p1Cards[0].value] ) {
      p1Cards.shift()
      p2Cards.shift()
      p2Cards.push(this.state.player2Show)
      p2Cards.push(this.state.player1Show)

      this.setState({
        player1Cards: p1Cards,
        player2Cards: p2Cards,
        message: "Player Two Wins!"
      })
    } else {
      this.setState({message: "War!"})
      let pot = []

      for (let i = 0; i < 4; i++) {
        console.log("p1 card: " + p1Cards[0].code)
        console.log("p2 card: " + p2Cards[0].code)
        pot.push(p1Cards.shift())
        pot.push(p2Cards.shift())
      }

      setTimeout(() => {
        this.setState({
          player1Show: p1Cards[0],
          player2Show: p2Cards[0]
        })
        if ( cardValues[p1Cards[0].value] > cardValues[p2Cards[0].value] ) {
          p1Cards.shift()
          p2Cards.shift()
          p1Cards.push(this.state.player1Show)
          p1Cards.push(this.state.player2Show)

          this.setState({
            player1Cards: p1Cards.concat(pot),
            player2Cards: p2Cards,
            message: "Player One Wins the War!",
            pot: pot
          })
        } else if ( cardValues[p2Cards[0].value] > cardValues[p1Cards[0].value] ) {
          p1Cards.shift()
          p2Cards.shift()
          p2Cards.push(this.state.player2Show)
          p2Cards.push(this.state.player1Show)

          this.setState({
            player1Cards: p1Cards,
            player2Cards: p2Cards.concat(pot),
            message: "Player Two Wins the War!",
            pot: pot
          })
        }

      }, 1000)

    }
  }

  render () {
    let image = ""
    if (this.state.cards) {
      image = <img src={this.state.cards[0].image} />
    }
    let player1 = ""
    if (this.state.player1Cards.length >= 1) {
      player1 = <PlayerComponent
                key="player1"
                name="Player One"
                card={this.state.player1Show}
                pileSize={this.state.player1Cards.length}
                hand="hand_one"
              />

    }

    let player2 = ""
    if (this.state.player2Cards.length >= 1) {
      player2 = <PlayerComponent
                key="player2"
                name="Player Two"
                card={this.state.player2Show}
                pileSize={this.state.player2Cards.length}
                hand="hand_two"
              />

    }

    let playButton = ""
    if (this.state.cards) {
      playButton = <h2><span className="button" onClick={this.handlePlay}>Play!</span></h2>
    }

    return (
      <div>
        <div>
          <h2><span className="button" onClick={this.handleFetchDeck}>Start a new game!</span></h2>
          <h2 className='center-me'>{this.state.message}</h2>
          <div className='play-me'>
            {playButton}
          </div>
          {player1}
          {player2}
          <ShowPot cards={this.state.pot} />
        </div>
      </div>
    )
  }
}

export default WarPage
