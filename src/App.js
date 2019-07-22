import React, {useEffect} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js'; // modals

const App = () => {
  useEffect(() => {
    M.AutoInit(); // Initializes Materialize JS

  })
  return (
    <div className="App">
      app App
    </div>
  );
}

export default App;
