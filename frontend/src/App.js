
import './App.css';
import { RouterProvider } from 'react-router-dom';
import {Provider} from "react-redux";
import store from './Reduxstore/Store';
import Router from './components/routing/Router';
import { SnackbarProvider } from 'notistack'


function App() {

  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Provider store={store}>
        <div className="App">
          <RouterProvider router={Router}/>
        </div>
      </Provider>
    </SnackbarProvider>
  );
}

export default App;
