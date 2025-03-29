import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';
import {AppNavigation} from './src/navigations/app.navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <GestureHandlerRootView>
          <AppNavigation />
        </GestureHandlerRootView>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
