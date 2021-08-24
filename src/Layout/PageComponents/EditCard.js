import React, {useEffect, useState} from "react";
import { readDeck } from "./../../utils/api/index.js";
import {
    Link,
    useParams,
  } from "react-router-dom";
  import "./../App.css";
  import Form from "./Form"

  export default function EditCard() {
    const { deckId, cardId } = useParams();
    const [deck, setDeck] = useState([]);

    
    useEffect(() => {
        readDeck(deckId)
            .then(setDeck);
    }, [deckId])

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
                    <Link to={`./../..`}>{deck['name']}</Link>
                </li>
                <li>
                    Edit
                </li>
            </ul>
        </div>
        <h1>Edit Card</h1>
        <Form deck={deck} cardId={cardId}/>
        </>
    )
  }