import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import classes from './Search.module.scss';
import search from '../img/search.png';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [reposArr, setReposArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreValue, setloadMoreValue] = useState(5);
  const [slicedReposArr, setSlicedReposArr] = useState([]);
  const [sortByDesc, setSortByDesc] = useState(true);

  const reposSearchEndRef = useRef(null);

  const getSearchValue = (event) => {
    setSearchValue(event.target.value);
    console.log(searchValue);
    setReposArr([]);
    setloadMoreValue(5);
    console.log(reposArr);
  };

  const getRepos = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.github.com/search/repositories?q=${searchValue}`
      );
      setReposArr(response.data.items);
      setIsLoading(false);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const sortRepos = () => {
    if (sortByDesc) {
      setReposArr(
        reposArr.sort((item1, item2) => {
          return item2.stargazers_count - item1.stargazers_count;
        })
      );
    } else {
      setReposArr(
        reposArr.sort((item1, item2) => {
          return item1.stargazers_count - item2.stargazers_count;
        })
      );
    }
  };

  const loadMoreValueHandler = () => {
    setloadMoreValue((prevState) => prevState + 5);
    console.log(loadMoreValue);
  };

  const showRepos = () => {
    getRepos();
    setSlicedReposArr(reposArr.slice(0, 5));
  };

  const showReposOnEnter = (e) => {
    if (e.key === 'Enter') {
      showRepos();
    }
  };
  const changeSortingDirection = () => setSortByDesc((prevState) => !prevState);

  const scrollToBottom = () => {
    reposSearchEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    sortRepos();
    setSlicedReposArr(reposArr.slice(0, loadMoreValue));
  }, [reposArr, loadMoreValue, sortByDesc]);

  useEffect(() => {
    scrollToBottom();
  }, [slicedReposArr.length]);

  return (
    <React.Fragment>
      <main>
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
        {isLoading ? (
          <div className={classes.loader}></div>
        ) : (
          <div
            className={
              reposArr.length === 0 ? classes.hidden : classes.search_results
            }
          >
            <p className={classes.sort_button}>
              Sort
              <span onClick={changeSortingDirection}>
                {sortByDesc ? ' ▼' : ' ▲'}
              </span>
            </p>

            {slicedReposArr.map((item) => (
              <p key={item.id} className={classes.result}>
                <a
                  href={item.git_url.replace('git', 'https')}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className={classes.item_name}>{item.name}</span>
                  <span className={classes.stars}>
                    <span>&#x2B50; </span> {item.stargazers_count}
                  </span>
                </a>
              </p>
            ))}
            <button
              ref={reposSearchEndRef}
              className={
                reposArr.length === 0 ? classes.hidden : classes.load_more
              }
              onClick={loadMoreValueHandler}
              disabled={loadMoreValue > reposArr.length ? 'disabled' : ''}
            >
              ● ● ● Load more
            </button>
            <div />
          </div>
        )}
      </main>
    </React.Fragment>
  );
};

export default Search;
