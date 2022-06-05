import React from 'react';
import { useState, useEffect } from 'react';
import classes from './SortButtons.module.scss';
import { useContext } from 'react';
import SearchContext from '../../context/SearchContext';

const SortButtons = () => {
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = () => {
    if (window.innerWidth < 600) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  const {
    reposArr,
    sortType,
    setSortType,
    sortDirectionDesc,
    setSortDirectionDesc,
    maxNumOfReqExceded,
  } = useContext(SearchContext);

  const changeSortingDirection = () =>
    setSortDirectionDesc((prevState) => !prevState);

  const sortByRating = () => {
    setSortType('rating');
  };

  const sortByName = () => {
    setSortType('name');
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
  });

  return (
    <div
      className={
        reposArr.length === 0 || maxNumOfReqExceded
          ? classes.hidden
          : classes.sort_button_container
      }
    >
      <button
        onClick={sortByRating}
        className={
          sortType === 'rating' ? classes.btn_active : classes.btn_non_active
        }
      >
        {isMobile ? 'RATING' : 'SORT BY RATING'}
      </button>
      <button
        onClick={sortByName}
        className={
          sortType === 'name' ? classes.btn_active : classes.btn_non_active
        }
      >
        {isMobile ? 'NAME' : 'SORT BY NAME'}
      </button>
      <button
        onClick={changeSortingDirection}
        className={classes.sort_direction_btn}
      >
        {isMobile ? 'SORT DIRECTION' : 'CHANGE SORT DIRECTION'}
        <span>{sortDirectionDesc ? ' ▼' : ' ▲'}</span>
      </button>
    </div>
  );
};

export default SortButtons;
