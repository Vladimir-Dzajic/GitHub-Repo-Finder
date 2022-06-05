import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Search from './components/Search/Search';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <div className="App">
      <Header />
      <SearchProvider>
        <Search />
      </SearchProvider>
      <Footer />
    </div>
  );
}

export default App;
