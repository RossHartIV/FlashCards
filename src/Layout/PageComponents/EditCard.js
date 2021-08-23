import React, {useEffect, useState} from "react";
import { readDeck, updateCard, readCard } from "./../../utils/api/index.js";
import {
    Link,
    useParams,
  } from "react-router-dom";
  import "./../App.css";

  export default function EditCard() {
    const { deckId, cardId} = useParams();
    const [deck, setDeck] = useState([]);
    const [card, setCard] = useState([]);
    const initialFormState = {
        front: '',
        back: '',
    };
    const [formData, setFormData] = useState({ ...initialFormState});
    
    useEffect(() => {
        readDeck(deckId)
            .then(setDeck);
    }, [])
    useEffect(() => {
        readCard(cardId)
            .then(setCard);
    }, [])
    useEffect(() => {
        setFormData({
            front: card['front'],
            back: card['back'],
        })
    }, [card])

    const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
    };
    const handleSubmit = () => {
        updateCard({ id: cardId, front: formData.front, back: formData.back, 'deckId': deckId });
    }

    return (
        <>
        <div>
            <ul class='breadcrumb'>
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
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">
                <p>Front</p>
                <textarea rows='3' id="front" type="text" name="front" onChange={handleChange} value={formData.front}/>
            </label>

            <br />
            <label htmlFor="description">
                <p>Back</p>
                <textarea rows='3' id="back" type="text" name="back" onChange={handleChange} value={formData.back}/>
            </label>
            <br />
            <Link to={`./../..`}>
                <button>Done</button>
            </Link>
            <button type="submit">Submit</button>
        </form>
        </>
    )
  }