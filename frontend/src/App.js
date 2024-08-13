
import './App.css';
import { RouterProvider } from 'react-router-dom';
import {Provider} from "react-redux";
import store from './Reduxstore/Store';
import Router from './components/routing/Router';


function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={Router}/>
      </div>
    </Provider>
  );
}

export default App;
