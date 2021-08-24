import React, { useState, } from "react";
import {
    Link,
    useHistory
  } from "react-router-dom";
  import "./../App.css"
import { createDeck, listDecks } from "./../../utils/api/index.js"

export default function NewDeck() {
    const [formData, setFormData] = useState({});
    const history = useHistory();
    const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
    };
    const handleSubmit = () => {
        async function makeDeck() {
            const res = await listDecks()
            const deckId = res.length+1
            history.push(`/decks/${deckId}/`)
            history.goForward();
            history.go(0);
        }
        createDeck({ ...formData })
        makeDeck()
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
                    Create Deck
                </li>
            </ul>
        </div>
        <h1>Create Deck</h1>
        <form>
            <label htmlFor="name">
                <p>Name</p>
                <input rows='3' id="name" type="text" name="name" onChange={handleChange} placeholder="Deck name here" defaultValue={formData.name}/>
                
            </label>
            <br />
            <label htmlFor="description">
                <p>Description</p>
                <textarea rows='3'  id="description" type="text" name="description" onChange={handleChange} placeholder="Deck description here" defaultValue={formData.description}/>
                
            </label>
            <br />
            <Link to='/'>
                <button className="btn btn-secondary">Cancel</button>
            </Link>
            <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
        </form>
        </>
    )
}