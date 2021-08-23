import React, {useEffect, useState} from "react";
import { readDeck, listCards } from "./../../utils/api/index.js"
import {
    Link,
    useHistory,
    useParams,
  } from "react-router-dom";
//   import Card from "./Card.js"
  import "./../App.css"

export default function Study() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState([]);
    const [side, setSide] = useState(true);
    const [card, setCard] = useState(0)
    // const [cards, setCards] =useState([])
    useEffect(() => {
        async function findDeck() {
            const res = await readDeck(deckId);
            setDeck(res);
        }
        findDeck();
    }, [])
    if (!deck) return null;
    const cards = deck.cards || null;
    if (!cards) return null;

    function Card({ side, setSide, cards, card, setCard}) {
        const history = useHistory();
        const handleFlip = () => setSide(!side);
  
        const handleNext = () => {
            if (parseInt(card) === cards.length-1) {
              if (window.confirm('Restart cards? \n \n Click \'cancel\' to return to the home page.')) {
                  setSide(!side);
                  setCard(0);
              }
              else {
                  history.push("/");
                  history.go(0);
              }
            }
            else {
              setSide(!side)
              setCard(card+1)
            }
        }
      
        return (
            <div>
              {cards.length<=2 ?  (
                      <>
                          <h2>Not enough cards</h2>
                          <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
                          <Link to='./cards/new'>
                              <button >Add Cards</button>
                          </Link>
                      </>
                  ) : side ? (
                          <>
                              <div>{cards[card].front}</div>
                              <button type="button" className="btn btn-primary btn-lg" onClick={handleFlip}>flip</button>
                              {/* <button type="button" className="btn btn-primary btn-lg" onClick={handleNext}>Next</button> */}
                          </>
                      ) : (
                          <>
                              <div>{cards[card].back}</div>
                              <button type="button" className="btn btn-primary btn-lg" onClick={handleFlip}>flip</button>
                              <button type="button" className="btn btn-primary btn-lg" onClick={handleNext}>Next</button>
                          </>
                      )
              }         
            </div>
        )
    }
    return (
        <div>
            <ul class='breadcrumb'>
                <li>
                    <Link to='/'>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to={`./`}>{deck['name']}</Link>
                </li>
                <li>
                    Study
                </li>
            </ul>
            <h1>{deck['name']}: Study</h1>
            <div>
                <p>Card {card+1} of {cards.length}</p>
                <Card side={side} setSide={setSide} cards={cards} card={card} setCard={setCard} />
            </div>
            {/* {Object.keys(deck)} */}
        </div>
    )
}