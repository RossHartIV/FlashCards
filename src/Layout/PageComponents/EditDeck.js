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
    const [deckName, setDeckName] = useState("")
    const [deckDescription, setDeckDescription] = useState("")

    useEffect(() => {
        async function getDeck() {
            const res = await readDeck(deckId)
            setDeck(res)
            setDeckName(res.name)
            setDeckDescription(res.description)
        }
        getDeck()
    }, [deckId])

    const handleNameChange = ({ target }) => {
        setDeckName(target.value)
    };

    const handleDescriptionChange = ({ target }) => {
        setDeckDescription(target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateDeck({ id: deckId, name: deckName, description: deckDescription });
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
                <input id="name" type="text" name="name" onChange={handleNameChange} value={deckName}/>
            </label>
            <br />
            <label htmlFor="description">
                <p>Description</p>
                <input id="description" type="text" name="description" onChange={handleDescriptionChange} value={deckDescription}/>
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