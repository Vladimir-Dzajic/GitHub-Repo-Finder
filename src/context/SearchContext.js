import axios from 'axios';
import { useState, useCallback, useEffect, useRef, createContext } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const VISIBLE_REPOS = 5;
  const GITHUB_SEARCH_URL = 'https://api.github.com/search/repositories?q=';

  const [reposArr, setReposArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreValue, setLoadMoreValue] = useState(VISIBLE_REPOS);
  const [slicedReposArr, setSlicedReposArr] = useState([]);
  const [sortType, setSortType] = useState('rating');
  const [sortDirectionDesc, setSortDirectionDesc] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [maxNumOfReqExceded, setMaxNumOfReqExceded] = useState(false);

  const getSearchValue = (event) => {
    setSearchValue(event.target.value.trim().toLowerCase());
    setLoadMoreValue(VISIBLE_REPOS);
    setNoResultsFound(false);
    setMaxNumOfReqExceded(false);
  };

  const reposSearchEndRef = useRef(null);

  const getRepos = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(GITHUB_SEARCH_URL + searchValue);
      setMaxNumOfReqExceded(false);
      if (response.status === 200 && response.data.items.length === 0) {
        setNoResultsFound(true);
        setReposArr(response.data.items);
      } else {
        setNoResultsFound(false);
        setReposArr(response.data.items);
      }

      setIsLoading(false);
      console.log(response);
    } catch (error) {
      console.error(error);
      if (error.response.status === 403) {
        setNoResultsFound(false);
        setIsLoading(false);
        setMaxNumOfReqExceded(true);
      }
    }
  };

  const sortReposByRating = useCallback(() => {
    if (sortType === 'rating' && sortDirectionDesc) {
      setReposArr(
        reposArr.sort((item1, item2) => {
          return item2.stargazers_count - item1.stargazers_count;
        })
      );
    } else if (sortType === 'rating' && !sortDirectionDesc) {
      setReposArr(
        reposArr.sort((item1, item2) => {
          return item1.stargazers_count - item2.stargazers_count;
        })
      );
    } else if (sortType === 'name' && sortDirectionDesc) {
      setReposArr(
        reposArr.sort((item1, item2) => {
          return item2.name.localeCompare(item1.name);
        })
      );
    } else if (sortType === 'name' && !sortDirectionDesc) {
      setReposArr(
        reposArr.sort((item1, item2) => {
          return item1.name.localeCompare(item2.name);
        })
      );
    }
  }, [reposArr, sortDirectionDesc, sortType]);

  useEffect(() => {
    sortReposByRating();
    setSlicedReposArr(reposArr.slice(0, loadMoreValue));
  }, [reposArr, loadMoreValue, sortReposByRating]);

  useEffect(() => {
    if (searchValue.length === 0) {
      setReposArr([]);
    }
  }, [searchValue]);

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        getSearchValue,
        getRepos,
        setSlicedReposArr,
        reposArr,
        slicedReposArr,
        loadMoreValue,
        reposSearchEndRef,
        setLoadMoreValue,
        isLoading,
        sortType,
        setSortType,
        sortReposByRating,
        sortDirectionDesc,
        setSortDirectionDesc,
        noResultsFound,
        maxNumOfReqExceded,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
