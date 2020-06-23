import React from 'react';
import {MoviesPage} from '../src/containers/MoviesPage/MoviesPage'
import {Provider} from "react-redux";
import {MovieDBstore} from './store/MovieDB'


function App() {
  return (
      <Provider store={MovieDBstore}>
   <MoviesPage/>
      </Provider>
  );
}

export default App;
