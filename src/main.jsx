import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import './index.css';
import App from './App.jsx';
import { AppContextProvider } from "./context/AppContext.jsx"; // ✅ fixed spelling


createRoot(document.getElementById('root')).render(
  <AppContextProvider>  {/* ✅ removed value prop */}
    <App />
  </AppContextProvider>
);
