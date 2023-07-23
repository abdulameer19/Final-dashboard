import React from "react";
import { Provider } from 'react-redux';
import store from './store/store';
import { Home } from './containers/Home';

const App: React.FC = () => {
    return (

  <div>
       <Provider store={store}>
        <Home />
      </Provider>
    </div>
  );
};

export default App;
