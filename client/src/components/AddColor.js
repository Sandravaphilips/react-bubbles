import React, {useState} from 'react';
import axiosWithAuth from '../axios';

const initialColorForm = {
    colorName: '',
    hexCode: ''
}
export default function AddColor() {
    const [colorForm, setColorForm] = useState(initialColorForm);

    const onNameChange = e => {
        
        setColorForm({
            colorName: e.target.value,
            hexCode: colorForm.hexCode
        });
    };
    
    const onCodeChange = e => {
    
        setColorForm({
            colorName: colorForm.colorName,
            hexCode: e.target.value
        });
    };

    function onFormSubmit(e) {
        // e.preventDefault();
        const newColor = {
            color: colorForm.colorName,
            code: {
            hex: colorForm.hexCode
            },
            id: Date.now()
        };
        axiosWithAuth().post('http://localhost:5000/api/colors', newColor)
        .then(response => console.log(response))
        .catch(err=> console.log(err))
    }
    return (
        <form onSubmit={onFormSubmit}>
            <label>Color Name
                <input onChange={onNameChange} value={colorForm.colorName} name='name' />
            </label><br />

            <label>Hex Code
                <input onChange={onCodeChange} value={colorForm.hexCode} name='hexcode' />
            </label><br />

            <input type='submit' />
        </form>
    )
}