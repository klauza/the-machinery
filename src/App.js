import React, {Fragment, useEffect} from 'react';
import SearchBar from './components/layout/SearchBar';
import Logs from './components/logs/Logs';


import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js'; // modals

const App = () => {
  useEffect(() => {
    M.AutoInit(); // Initializes Materialize JS

  })
  return (
    <Fragment>
      <SearchBar />
      <div className="container">
        <Logs />
      </div>
    </Fragment>
  );
}

export default App;
