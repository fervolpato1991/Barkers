import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDogById } from '../../redux/actions';
import DetailCard from '../DetailCard/DetailCard';
import style from './DetailPage.module.css';

const DetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDogById(id));
    }, [dispatch, id]);
    return (
        <div className={style.container}>
            <DetailCard/>
        </div>
    )
}

export default DetailPage;