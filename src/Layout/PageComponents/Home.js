import React, {useEffect, useState} from "react";
import { listDecks, deleteDeck } from "./../../utils/api/index.js";
import {
    Link,
  } from "react-router-dom";


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
            setDecks(decks.filter(({ id }) => id != event.target.id));
            deleteDeck(event.target.id);
        }
    } 

    function showDecks(deck) {
            return (<div>
                <div>
                    {deck['name']}
                </div>
                <div>
                    {deck.cards.length} cards
                </div>
                <div>
                     <Link to={`./decks/${deck['id']}/edit`}>
                        <button>Edit</button>
                    </Link>
                    <Link to={`./decks/${deck['id']}/study`}>
                        <button>Study</button>
                    </Link>
                    <button onClick={handleDelete} id={deck['id']}>Delete</button>
                    
                </div>
            </div>
            )
    }

    return (
        <div>
            <Link to='/decks/new'>
                <button>Create Deck</button>
            </Link>
            {decks.map((deck) => showDecks(deck))}
        </div>
    )
}