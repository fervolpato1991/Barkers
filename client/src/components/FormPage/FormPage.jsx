import validation  from "../../validation";
import {React, useState, useEffect} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { getAllTemperaments } from '../../redux/actions';
import style from './FormPage.module.css';


const FormPage = () => {
    const dispatch = useDispatch();
    const allTemperaments = useSelector(state => state.temperaments);
    const [errors, setErrors] = useState({})
    const [modal, setModal] = useState(false);
    const [apiResponse, setApiResponse] = useState("");
    const [isApiError, setIsApiError] = useState(false);

    useEffect(() => {
        dispatch(getAllTemperaments());
    }, [dispatch]);


    const [form, setForm] = useState({
        name: "",
        image: "",
        minHeight: 0,
        maxHeight: 0,
        minWeight: 0,
        maxWeight: 0,
        minLifeSpan: 0,
        maxLifeSpan: 0,
        temperaments: []
    });

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value })
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const error = validation(form);
        if (error === null) {
            axios.post("http://localhost:3001/dogs", form)
                .then(res => {
                    setIsApiError(false);
                    setApiResponse(res.data.message);
                    setModal(!modal);
                    setErrors({});
                    setForm({
                        name: "",
                        image: "",
                        minHeight: 0,
                        maxHeight: 0,
                        minWeight: 0,
                        maxWeight: 0,
                        minLifeSpan: 0,
                        maxLifeSpan: 0,
                        temperaments: []
                    });
                })
                .catch((error) => {
                    setIsApiError(true);
                    setApiResponse(error.response.data.error);
                    setModal(!modal);
                    setErrors({});
                });
        }
        else {
            setErrors(error);
        }
    }

    function selectHandler(event) {
        setForm({
            ...form, temperaments: [...form.temperaments, event.target.value],
        });
    }

    function deleteHandler(element) {
        setForm({
            ...form, temperaments: form.temperaments.filter((temp) => temp !== element),
        });
    }
    return (
        <form onSubmit={submitHandler} className={style.form}>
            {(modal) && (
                <div className={style.containermodal}>
                    <div onClick={toggleModal}></div>
                    <div>
                        {isApiError ?
                        <h2>Sorry, the information is wrong </h2>
                        :
                        <h2> New Breed Created! </h2>}
                        <p className={style.response}>{apiResponse}</p>
                         < button className={style.closemodal} onClick={toggleModal}>X</button>
                    </div>
                </div>
            )
            }
            <div className={style.container}>
                <h2 className={style.mainTitle}>Create a Dog:</h2>
                <label className={style.title}>Name: </label>
                <input className={style.input} type="text" value={form.name} name="name" onChange={changeHandler}/>
                {errors.name && <p className={style.error}>{errors.name}</p>}
                <br/>
                <label className={style.title}>Image URL: </label>
                <input className={style.input} type="url" value={form.image} name="image" onChange={changeHandler}/>
                {errors.image && <p className={style.error}>{errors.image}</p>}
                <br/>
                <label className={style.title}>Minimum Height: </label>
                <input className={style.input} type="number" value={form.minHeight} name="minHeight" onChange={changeHandler}/>
                {errors.minHeight && <p className={style.error}>{errors.minHeight}</p>}
                <br/>
                <label className={style.title}>Maximum Height: </label>
                <input className={style.input} type="number" value={form.maxHeight} name="maxHeight" onChange={changeHandler}/>
                {errors.maxHeight && <p className={style.error}>{errors.maxHeight}</p>}
                <br/>
                <label className={style.title}>Minimum Weight: </label>
                <input className={style.input} type="number" value={form.minWeight} name="minWeight" onChange={changeHandler}/>
                {errors.minWeight && <p className={style.error}>{errors.minWeight}</p>}
                <br/>
                <label className={style.title}>Maximum Weight: </label>
                <input className={style.input} type="number" value={form.maxWeight} name="maxWeight" onChange={changeHandler}/>
                {errors.maxWeight && <p className={style.error}>{errors.maxWeight}</p>}
                <br/>
                <label className={style.title}>Minimum Life Span: </label>
                <input className={style.input} type="number" value={form.minLifeSpan} name="minLifeSpan" onChange={changeHandler}/>
                {errors.minLifeSpan && <p className={style.error}>{errors.minLifeSpan}</p>}
                <br/>
                <label className={style.title}>Maximum Life Span: </label>
                <input className={style.input} type="number" value={form.maxLifeSpan} name="maxLifeSpan" onChange={changeHandler}/>
                {errors.maxLifeSpan && <p className={style.error}>{errors.maxLifeSpan}</p>}
                <br/>
                <label className={style.tempselect}>Temperaments: </label>
                <select onChange={selectHandler} className={style.temps}>
                    <option>Select Temperaments: </option>
                    {allTemperaments.map((temperament) => {
                        return (
                            <option key={temperament.id} name={temperament.name}>{temperament.name}</option>
                        )
                    })}
                </select>
                <br/>
                <h3 className={style.temptitle}>Temperaments selected: </h3>
                <div className={style.tempcontainer}>
                    {form.temperaments.map((element) => (
                        <div key={element}><span>{element}</span><button className={style.tempbutton} onClick={() => deleteHandler(element)}>x</button></div>
                    ))}
                </div>
                {errors.temperaments && <p className={style.error}>{errors.temperaments}</p>}
            </div>
            <button type="submit" className={style.button} disabled={!form.name || !form.image||!form.minHeight||!form.maxHeight||!form.minWeight||!form.maxWeight||!form.minLifeSpan||!form.maxLifeSpan}>Create Dog</button>
        </form>
    )
}

export default FormPage;