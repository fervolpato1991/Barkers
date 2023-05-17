import validation  from "../../validation";
import {React, useState, useEffect} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { getAllTemperaments } from '../../redux/actions';
import style from './FormPage.module.css';


const FormPage = () => {
    const dispatch = useDispatch();
    const allTemperaments = useSelector(state => state.temperaments);
    const [apiResponse, setApiResponse] = useState("");
    const [isApiError, setIsApiError] = useState(false);
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        name: "",
        image: "",
        minLifeSpan: 0,
        maxLifeSpan: 0,
        minWeight: 0,
        maxWeight: 0,
        minHeight: 0,
        maxHeight: 0,
        temperaments: []
    });

    useEffect(() => {
        dispatch(getAllTemperaments());
    }, [dispatch]);

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value });
    }
    const submitHandler = (event) => {
        event.preventDefault();
        const error = validation(form);
        if(error === null) {
            axios.post('https://localhost:3001/dogs', form)
            .then(response => {
                setIsApiError(false);
                setApiResponse(response.data.message);
                setErrors({});
                setForm({
                    name: "",
                    image: "",
                    minLifeSpan: 0,
                    maxLifeSpan: 0,
                    minWeight: 0,
                    maxWeight: 0,
                    minHeight: 0,
                    maxHeight: 0,
                    temperaments: []
                })
            })
            .catch((error) => {
                setIsApiError(true);
                setApiResponse(error.response.data.error);
                setErrors({});
            });
        }
        else {
            setErrors(error);
        }
    }

    const selectHandler = (event) => {
        setForm({
            ...form, 
            temperaments: [...form.temperaments, event.target.value]
        })
    };
    const deleteHandler = (element) => {
        setForm({
            ...form, 
            temperaments: form.temperaments.filter((temperament) => temperament !== element)
        })
    };
    return (
        <form onSubmit={submitHandler} className={style.form}>
            <div>
                {isApiError ? <h2>Sorry, there is an error with the info</h2>
                 : <h2>Dog's breed created</h2>
                 }
                 <p>{apiResponse}</p>
            </div>
            <div className={style.newDog}>
                <h2>Create a Dog:</h2>
                <label>Name: </label>
                <input type="text" value={form.name} name="name" onChange={changeHandler}/>
                <br/>
                <label>Image URL: </label>
                <input type="url" value={form.image} name="image" onChange={changeHandler}/>
                <br/>
                <label>Minimum Height: </label>
                <input type="number" value={form.minHeight} name="minHeight" onChange={changeHandler}/>
                <br/>
                <label>Maximum Height: </label>
                <input type="number" value={form.maxHeight} name="maxHeight" onChange={changeHandler}/>
                <br/>
                <label>Minimum Weight: </label>
                <input type="number" value={form.minWeight} name="minWeight" onChange={changeHandler}/>
                <br/>
                <label>Maximum Weight: </label>
                <input type="number" value={form.maxWeight} name="maxWeight" onChange={changeHandler}/>
                <br/>
                <label>Minimum Life Span: </label>
                <input type="number" value={form.minLifeSpan} name="minLifeSpan" onChange={changeHandler}/>
                <br/>
                <label>Maximum Life Span: </label>
                <input type="number" value={form.maxLifeSpan} name="maxLifeSpan" onChange={changeHandler}/>
                <br/>
                <label>Temperaments: </label>
                <select onChange={selectHandler}>
                    <option>Select Temperaments: </option>
                    {allTemperaments.map((temperament) => {
                        return (
                            <option key={temperament.id} name={temperament.name}>{temperament.name}</option>
                        )
                    })}
                </select>
                <br/>
                <h3>Temperaments selected: </h3>
                <div>
                    {form.temperaments.map((element) => (
                        <div><span key={element}>{element}</span><button onClick={() => deleteHandler(element)}>x</button></div>
                    ))}
                </div>
            </div>
        </form>
    )
}

export default FormPage;