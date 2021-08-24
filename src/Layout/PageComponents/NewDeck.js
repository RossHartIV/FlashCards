import React, { useState, } from "react";
import {
    Link,
  } from "react-router-dom";
  import "./../App.css"
import { createDeck } from "./../../utils/api/index.js"

export default function NewDeck() {
    const [formData, setFormData] = useState({});
    const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
    };
    const handleSubmit = () => {
        createDeck({ ...formData })
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
        <form onSubmit={handleSubmit}>
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
                <button>Cancel</button>
            </Link>
            <button type="submit">Submit</button>
        </form>
        </>
    )
}