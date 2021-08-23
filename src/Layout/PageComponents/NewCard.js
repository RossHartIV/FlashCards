import React, {useEffect, useState} from "react";
import { readDeck, createCard } from "./../../utils/api/index.js";
import {
    Link,
    useParams,
  } from "react-router-dom";
  import "./../App.css";

export default function NewCard() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState([]);
    const initialFormState = {
        front: '',
        back: '',
    };
    const [formData, setFormData] = useState({ ...initialFormState});

    useEffect(() => {
        readDeck(deckId)
            .then(setDeck);
    }, [deckId])

    const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
    };
    const handleSubmit = () => {
        createCard(deckId, { ...formData , 'deckId': deckId});
    }

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
            <Link to={`./..`}>
                <button>Done</button>
            </Link>
            <button type="submit">Submit</button>
        </form>
        </>
    )
}