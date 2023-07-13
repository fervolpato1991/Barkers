import React, { Component } from 'react';
import style from './TemperamentFilter.module.css';

class TemperamentFilter extends Component {
  render() {
    const { form, allTemperaments, temperamentsHandler } = this.props;

    return (
      <div className={style.container}>
        <h1 className={style.title}>Filter by temperament</h1>
        <select onChange={temperamentsHandler}>
          <option defaultValue> Select temperament</option>
          {allTemperaments.map((temp) => {
            return (
              <option key={temp.id} name={temp.name}>
                {temp.name}
              </option>
            );
          })}
        </select>
        <div className={style.temperament}>
          {/* {form.temperaments.map((element) => (
            <span key={element}>{element}</span>
          ))} */}
        </div>
      </div>
    );
  }
}

export default TemperamentFilter;