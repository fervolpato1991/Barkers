import { React } from 'react';
import style from './Cards.module.css';
import Card from '../Card/Card';

const Cards = ({dogs}) => {
    return (
        <div className={style.cards}>
            {
                dogs.map(dog => {
                    return <Card 
                    key={dog.id} 
                    id={dog.id}
                    name={dog.name}
                    minWeight={dog.minWeight}
                    maxWeight={dog.maxWeight}
                    temperaments={dog.temperaments}
                    image={dog.image} />
                })
            }
        </div>
    )
}

export default Cards