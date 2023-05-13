import { Navlink } from 'react-router-dom';
import style from './Card.module.css';

const Card = ({id, name, image, temperaments, minWeight, maxWeight}) => {
    return (
        <div className={style.card}>
            <Navlink className={style.link} to={`/detail/${id}`}>
            <h2 className={style.details}>{name}</h2>
            </Navlink>
            <h3 className={style.temperaments}>{temperaments}</h3>
            <h3 className={style.weight}>{minWeight} - {maxWeight} kg</h3>
            <img src={image} alt={image} className={style.image}/>
        </div>
    )
}

export default Card;