import React, {useEffect, useState} from "react";
import { readDeck } from "./../../utils/api/index.js";
import {
    Link,
    useParams,
  } from "react-router-dom";
  import "./../App.css";
  import FormComponent from "./FormComponent"

export default function NewCard() {
    const { deckId } = useParams();
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
                    <Link to={`./..`}>{deck['name']}</Link>
                </li>
                <li>
                    Add Card
                </li>
            </ul>
        </div>
        <h3>{deck['name']}: Add Card</h3>
        <FormComponent deck={deck} cardId={false}/>
        </>
    )
}