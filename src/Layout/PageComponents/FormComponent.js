import React, {useEffect, useState} from "react"
import { Link  } from "react-router-dom"
import { createCard, updateCard, readCard } from "../../utils/api";

export default function FormComponent({ deck, cardId }) {
    const initialFormState = {
        front: '',
        back: '',
    };
    const [formData, setFormData] = useState({ ...initialFormState});
    
    useEffect(() => {
        async function getCard() {
            if (!!cardId){
                const res = await readCard(cardId);
                setFormData({
                    front: res['front'],
                    back: res['back'],
                })}
        }
        getCard()
    }, [cardId])
    
    const handleChange = ({ target }) => {
        setFormData({
          ...formData,
          [target.name]: target.value,
        });
    };
    
    const handleSubmit = () => {
        
        if (!cardId) {
            createCard(deck.id, { ...formData , "deckId": Number(deck.id) });
        }
        else {
            updateCard({ id: cardId, front: formData.front, back: formData.back, 'deckId': deck.id })
        }
    }

    const sendBack = () => {
        if (cardId) {
            return './../..'
        }
        return './..'
    }

    return (
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
            <Link to={sendBack()}>
                <button className="btn btn-secondary">Done</button>
            </Link>
            <button type="submit" className="btn btn-secondary">Submit</button>
        </form>
    )
}