import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReactDom from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

ReactDom.createRoot(document.getElementById('root')).render(
 <BrowserRouter>
    <App />
 </BrowserRouter>
)
