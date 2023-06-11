import React from 'react';
import { connect } from 'react-redux';
import { getDogById } from '../../redux/actions';
import DetailCard from '../DetailCard/DetailCard';
import style from './DetailPage.module.css';

class DetailPage extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(){
        super()
    }
    componentDidMount(){
        const {id} = this.props.match.params;
        this.props.dispatch(getDogById(id));
    }
    render(){
    return (
        <div className={style.container}>
            <DetailCard/>
        </div>
    )
}
}

export default connect()(DetailPage);