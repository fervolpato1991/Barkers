import React from 'react';
import style from './Pagination.module.css';


const Pagination = ({ 
    pagination,
    firstHandler, 
    lastHandler, 
    prevHandler, 
    nextHandler, 
    totalDogs, 
    currentPage, 
    dogsPerPage, 
    pageNumberLimit, 
    minPageLimit, 
    maxPageLimit}) => {

        const numPages = [];
        const firstPage = 0;
        let lastPage = 0;
        const amountOfPages = Math.ceil(totalDogs / dogsPerPage);

        for(let i = 0; i < amountOfPages; i++){
            lastPage = i;
            numPages.push(i);
        }

    return (
        <div className={style.allButtons}>
            <button onClick={()=>firstHandler(firstPage)}>First</button>
            <button onClick={prevHandler}>Prev</button>
            {numPages?.map((page) => {
                if(page >= minPageLimit && page < maxPageLimit){
                    return <button id={page} key={page} onClick={() => pagination(page)}>{page + 1}</button>
                }else return null;
            })}
            <button onClick={nextHandler}>Next</button>
            <button onClick={()=>lastHandler(lastPage)}>Last</button>
        </div>
    )
}


export default Pagination;