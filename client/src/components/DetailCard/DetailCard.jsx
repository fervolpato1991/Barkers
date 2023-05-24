import axios from 'axios';
import { React, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './DetailCard.module.css';

const DetailCard = () => {
    const dog = useSelector(state => state.dog);
    const [apiResponse, setApiResponse] = useState("");
    const [apiError, setApiError] = useState(false);
    const [modal, setModal] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };
    if(modal) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }
    const modalHandler = () => {
        toggleModal()
    }
    const modalSubmit = () => {
        setModalDelete(true);
        axios.delete(`http://localhost:3001/dogs/${dog.id}`)
        .then(res => {
            setApiResponse(res.data.message);
        })
        .catch((error) => {
            setApiError(true);
            setApiResponse(error.reponse.data.error);
        });
    }
    return (
        <div className={style.container}>
            {(modal) && (
                <div className={style.modal}>
                    <h3> Do you want to remove the dog: {dog.name}? </h3>
                    <button onClick={() => modalSubmit()}>Yep!</button>
                    <button onClick={modalHandler}>no</button>
                </div>
            )}
            {modalDelete ? <div>
                {!apiError ? <div>
                    <h2>Dog removed: {dog.name}</h2>
                    <p>{apiResponse}</p>
                </div> : <p>{apiResponse}</p>
                }
                <Link to='/home'>
                    <button>x</button>
                </Link>
            </div> : null}
            <div>
                <h2 className={style.title}>{dog.name}</h2>
                
                <h3 className={style.title}>Id:</h3>
                <p className={style.description}>{dog.id}</p>
                <h3 className={style.title}>Weight:</h3>
                <p className={style.description}>{dog.minWeight} - {dog.maxWeight} kgs</p>
                <h3 className={style.title}>Height:</h3>
                <p className={style.description}>{dog.minHeight} - {dog.maxHeight} cm</p>
                <h3 className={style.title}>Life span:</h3>
                <p className={style.description}>{dog.minLifeSpan} - {dog.maxLifeSpan} years</p>
                <h3 className={style.title}>Temperament:</h3>
                <p className={style.description}>{dog.temperaments}</p>
                <img src={dog.image} alt={dog.name} className={style.image}/>
            </div>
        </div>
    )
}

export default DetailCard