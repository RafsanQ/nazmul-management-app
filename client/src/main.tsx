import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { store } from './store'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'


import { ChakraProvider } from '@chakra-ui/react'
import './index.css'
import persistStore from 'redux-persist/es/persistStore';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </PersistGate>
    </Provider>
  </ChakraProvider>
)
