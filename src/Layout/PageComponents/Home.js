import React, {useEffect, useState} from "react";
import { listDecks, deleteDeck } from "./../../utils/api/index.js";
import {
    Link,
  } from "react-router-dom";
  import "./../App.css"


export default function Home() {
    const [decks, setDecks] = useState([]);
    
    useEffect(() => {
        async function findDecks (){
            const res = await listDecks();
            setDecks([...res]);
        }
        findDecks()
    }, [])
    
    const handleDelete = (event) => {
        if (window.confirm('Delete this deck?\n\n You will not be able to recover it.')) {
            
            console.log("Event Id:", event.target.id)
            setDecks(decks.filter(({ id }) => Number(id) !== Number(event.target.id)));
            deleteDeck(event.target.id);
        }
    } 

    function showDecks(deck) {
            return (
            <div key={deck.id} className="deck">
                <div className="deckHeader-Container">
                    <div className="deckHeader-Child">
                        {deck['name']}
                    </div>
                    <div className="deckHeader-Child">
                        {deck.cards.length} cards
                    </div>
                </div>
                <div className="homeLinks">
                     <Link to={`./decks/${deck['id']}/edit`} className="homeLinks-Child">
                        <button className="btn btn-secondary">Edit</button>
                    </Link>
                    <Link to={`./decks/${deck['id']}/study`} className="homeLinks-Child">
                        <button className="btn btn-secondary">Study</button>
                    </Link>
                    <button onClick={handleDelete} id={deck['id']} className="btn btn-danger homeLinks-Child">Delete</button>
                    
                </div>
            </div>
            )
    }

    return (
        <div>
            <Link to='/decks/new'>
                <button className="btn btn-secondary">Create Deck</button>
            </Link>
            {decks.map((deck) => showDecks(deck))}
        </div>
    )
}