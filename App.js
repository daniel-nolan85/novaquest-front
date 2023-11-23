import { Provider } from 'react-redux';
import { store } from './src/services/redux/store';
import { AppComponents } from './AppComponents';

const App = () => {
  return (
    <Provider store={store}>
      <AppComponents />
    </Provider>
  );
};

export default App;
