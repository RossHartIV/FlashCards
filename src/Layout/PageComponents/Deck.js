import React, {useEffect, useState} from "react";
import { readDeck, deleteDeck, deleteCard } from "./../../utils/api/index.js";
import {
    Link,
    useHistory,
    useParams,
  } from "react-router-dom";
import "./../App.css";

export default function Deck() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState([]);
    const [cards, setCards] = useState([]);
    const history = useHistory();
    useEffect(() => {
        async function getDeck(){
            const res = await readDeck(deckId);
            setDeck(res)
            setCards(res.cards)
        }
        getDeck();
    }, [deckId]);
    if (!deck) return null;
    if (!cards) return null;
    
    
    const handleDeleteDeck = () => {
        async function remove(){
            const res = await deleteDeck(deckId);
        if (res){
            history.push(`/`);
            history.goForward();
            history.go(0);
        }
        }
    
        if (window.confirm('Delete this deck?\n\n You will not be able to recover it.')){
        remove();
    }
    }
    const handleDeleteCard = (event) => {
        if (window.confirm('Delete this card?\n\n You will not be able to recover it.')) {
            setCards(cards.filter(({ id }) => Number(id) !== Number(event.target.id)));
            deleteCard(event.target.id);
        }
    }

    function Cards() {
        return cards.map((card) => (
        <div key={card.id}>
            <div>
                {card.front}
            </div>
            <div>
                {card.back}
                <div>
                    <Link to={`./cards/${card.id}/edit`}>
                        <button type="button" className="btn btn-secondary btn-lg">Edit</button>
                    </Link>
                    <button type="button" className="btn btn-danger btn-lg"  id={card.id} onClick={handleDeleteCard}>Delete</button>
                </div>
            </div>
        </div>
    ))}

    return (
        <>
        <div>
            <ul className='breadcrumb'>
                <li>
                    <Link to='/'>
                        Home
                    </Link>
                </li>
                <li>
                    {deck['name']}
                </li>
            </ul>
        </div>
        <h3>{deck['name']}</h3>
        <p>{deck['description']}</p>
        <Link to='./edit'>
            <button>Edit</button>
        </Link>
        <Link to='./study'>
            <button>Study</button>
        </Link>
        <Link to='./cards/new'>
            <button>Add Cards</button>
        </Link>
        <button onClick={handleDeleteDeck}>Delete</button>
        <div>
            <h1>Cards</h1>
            <Cards/>
        </div>
        </>
    )
}