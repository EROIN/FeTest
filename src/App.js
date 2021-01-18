import React from 'react';
import {Provider} from 'react-redux';

import {Routes} from './routes';
import store from './redux/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;


// const App = () => (
//     <div className="container">
//         <h1>Hello World, React!</h1>
//     </div>
// )

// export default App;
