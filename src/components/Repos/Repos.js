import React from 'react';
import {useCallback, useEffect, useContext } from 'react';
import SearchContext from '../../context/SearchContext';
import classes from './Repos.module.scss';

const Repos = () => {
  const {
    reposArr,
    slicedReposArr,
    loadMoreValue,
    setLoadMoreValue,
    reposSearchEndRef,
    maxNumOfReqExceded,
  } = useContext(SearchContext);

  const loadMoreValueHandler = () => {
    setLoadMoreValue((prevState) => prevState + 5);
  };

  const scrollToBottom = useCallback(() => {
    reposSearchEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [reposSearchEndRef]);

  useEffect(() => {
    scrollToBottom();
  }, [slicedReposArr.length, scrollToBottom]);

  return (
    <div
      className={
        reposArr.length === 0 || maxNumOfReqExceded
          ? classes.hidden
          : classes.search_results
      }
    >
      {slicedReposArr.map((item) => (
        <p key={item.id} className={classes.result}>
          <a
            href={item.git_url.replace('git', 'https')}
            target="_blank"
            rel="noreferrer"
          >
            <span className={classes.item_name}>{item.name}</span>
            <span className={classes.stars}>
              <span>⭐ </span> {item.stargazers_count}
            </span>
          </a>
        </p>
      ))}
      <button
        ref={reposSearchEndRef}
        className={reposArr.length === 0 ? classes.hidden : classes.load_more}
        onClick={loadMoreValueHandler}
        disabled={loadMoreValue > reposArr.length ? 'disabled' : ''}
      >
        LOAD MORE REPOS
      </button>
      <div />
    </div>
  );
};

export default Repos;
