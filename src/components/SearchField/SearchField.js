import React from 'react';
import classes from './SearchField.module.scss';
import search from '../../img/search.png';
import { useContext } from 'react';
import SearchContext from '../../context/SearchContext';

const SearchField = () => {
  const { getSearchValue, getRepos, setSlicedReposArr, reposArr } =
    useContext(SearchContext);

  const showRepos = () => {
    getRepos();
    setSlicedReposArr(reposArr.slice(0, 5));
  };

  const showReposOnEnter = (e) => {
    if (e.key === 'Enter') {
      showRepos();
    }
  };
  return (
    <div className={classes.search_field_container}>
      <input
        type="text"
        name="search"
        placeholder="Search Repos"
        className={classes.search_field}
        onChange={getSearchValue}
        onKeyPress={showReposOnEnter}
      ></input>
      <button className={classes.search_button} onClick={showRepos}>
        <img src={search} alt="Search" />
      </button>
    </div>
  );
};

export default SearchField;
