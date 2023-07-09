import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDogById } from '../../redux/actions';
import DetailCard from '../DetailCard/DetailCard';
import style from './DetailPage.module.css';

const DetailPage = ({ dispatch }) => {
  const { id } = useParams();

  useEffect(() => {
    dispatch(getDogById(id));
  }, [dispatch, id]);

  return (
    <div className={style.container}>
      <DetailCard />
    </div>
  );
};

export default connect()(DetailPage);