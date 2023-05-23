import React, { Component } from 'react';
import style from './Pagination.module.css';

class Pagination extends Component {
  render() {
    const {
      pagination,
      firstHandler,
      lastHandler,
      prevHandler,
      nextHandler,
      totalDogs,
      dogsPerPage,
      minPageLimit,
      maxPageLimit,
    } = this.props;

    const numPages = [];
    const firstPage = 0;
    let lastPage = 0;
    const amountOfPages = Math.ceil(totalDogs / dogsPerPage);

    for (let i = 0; i < amountOfPages; i++) {
      lastPage = i;
      numPages.push(i);
    }

    return (
      <div className={style.container}>
        <button onClick={() => firstHandler(firstPage)} className={style.button}>
          First
        </button>
        <button onClick={prevHandler} className={style.button}>
          Prev
        </button>
        {numPages?.map((page) => {
          if (page >= minPageLimit && page < maxPageLimit) {
            return (
              <button id={page} key={page} onClick={() => pagination(page)}>
                {page + 1}
              </button>
            );
          } else return null;
        })}
        <button onClick={nextHandler} className={style.button}>
          Next
        </button>
        <button onClick={() => lastHandler(lastPage)} className={style.button}>
          Last
        </button>
      </div>
    );
  }
}

export default Pagination;