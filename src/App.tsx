import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { SnackbarProvider } from 'notistack';

import store, { persistor } from '@/redux/store';
import ThemeConfig from './theme/ThemeConfig';
import RouterConfig from './routes/RouterConfig';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeConfig>
          <SnackbarProvider
            dense
            maxSnack={5}
            preventDuplicate
            autoHideDuration={4000}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            <RouterConfig />
          </SnackbarProvider>
        </ThemeConfig>
      </PersistGate>
    </Provider>
  );
};

export default App;
