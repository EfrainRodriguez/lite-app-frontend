import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import store, { persistor } from '@/redux/store';
import ThemeConfig from './theme/ThemeConfig';
import RouterConfig from './routes/RouterConfig';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeConfig>
          <RouterConfig />
        </ThemeConfig>
      </PersistGate>
    </Provider>
  );
};

export default App;
