import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store/store';
import {AppNavigation} from './src/navigations/app.navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <GestureHandlerRootView>
            <AppNavigation />
          </GestureHandlerRootView>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
