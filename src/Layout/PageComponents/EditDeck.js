import React, {useEffect, useState} from "react";
import { readDeck, updateDeck } from "./../../utils/api/index.js";
import {
    Link,
    useParams,
  } from "react-router-dom";
  import "./../App.css";

  export default function Edit() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState([]);
    const initialFormState = {
        name: '',
        description: '',
    };
    const [formData, setFormData] = useState({ ...initialFormState});

    useEffect(() => {
        readDeck(deckId)
            .then(setDeck);
    }, [])
    useEffect(() => {
        setFormData({
            name: deck['name'],
            description: deck['description'],
        });
    }, [deck])

    const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
    };
    const handleSubmit = () => {
        updateDeck({ id: deckId, name: formData.name, description: formData.description });
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
                    <Link to={`./`}>{deck['name']}</Link>
                </li>
                <li>
                    Edit
                </li>
            </ul>
        </div>
        <h1>Edit Deck</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">
                <p>Name</p>
                <input id="name" type="text" name="name" onChange={handleChange} value={formData.name}/>
            </label>
            <br />
            <label htmlFor="description">
                <p>Description</p>
                <input id="description" type="text" name="description" onChange={handleChange} value={formData.description}/>
            </label>
            <br />
            <Link to='./'>
                <button>Cancel</button>
            </Link>
            <button type="submit">Submit</button>
        </form>
        </>
    )
  }