import React from 'react';
import { useContext } from 'react';
import SearchContext from '../../context/SearchContext';
import Repos from '../Repos/Repos';
import SearchField from '../SearchField/SearchField';
import SortButtons from '../SortButtons/SortButtons';
import classes from './Search.module.scss';

const Search = () => {
  const { isLoading, noResultsFound, maxNumOfReqExceded } =
    useContext(SearchContext);

  return (
    <main>
      <SearchField />
      {isLoading ? (
        <div className={classes.loader}></div>
      ) : (
        <div className={classes.search_results_container}>
          <SortButtons />
          <Repos />
        </div>
      )}
      {noResultsFound ? (
        <div className={classes.error_container}>
          <p>No results found</p>
        </div>
      ) : (
        ''
      )}
      {maxNumOfReqExceded ? (
        <div className={classes.error_container}>
          <p>Maximum number of requests to the API exceeded</p>
        </div>
      ) : (
        ''
      )}
    </main>
  );
};

export default Search;
