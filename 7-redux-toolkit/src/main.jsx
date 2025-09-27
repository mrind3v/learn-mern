import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux" 
import { store } from './state/store.js'


createRoot(document.getElementById('root')).render(
  // we will wrap our entire app with provider, provide our store to provider
  // will allow any react compnt to use our store
  <Provider store={store}>
    <App />
  </Provider>,
  // next go and create your slice -> we now go to counter folder inside state
  // and create a CounterSlice.js file where we shall define all our states related
  // to a counter
)
