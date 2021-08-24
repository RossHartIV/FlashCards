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
        <div key={card.id} className="card">
            <div className="cardHeader-Container" >
                <div className="deckHeader-Child">
                    Front: {card.front}
                </div>
                <div className="cardHeader-Child">
                    Back: {card.back}
                </div>
            </div>
            <div className="cardLinks-Container">
                <Link to={`./cards/${card.id}/edit`} className="cardLinks-Child">
                    <button type="button" className="btn btn-secondary btn-lg">Edit</button>
                </Link>
                <button type="button" className="btn btn-danger btn-lg cardLinks-Child"  id={card.id} onClick={handleDeleteCard} >Delete</button>
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
        <div className="deckViewLinks-Container">
            <Link to='./edit' className="deckViewLinks-Child">
                <button className="btn btn-secondary">Edit</button>
            </Link>
            <Link to='./study' className="deckViewLinks-Child">
                <button className="btn btn-secondary">Study</button>
            </Link>
            <Link to='./cards/new' className="deckViewLinks-Child">
                <button className="btn btn-secondary">Add Cards</button>
            </Link>
            <button onClick={handleDeleteDeck} className="deckViewLinks-Child btn btn-danger">Delete</button>
        </div>
        <div>
            <h1>Cards</h1>
            <Cards/>
        </div>
        </>
    )
}