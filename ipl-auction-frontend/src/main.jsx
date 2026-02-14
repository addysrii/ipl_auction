import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuctionProvider} from "./context/AuctionContext.jsx";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
 <AuctionProvider>
    <App />
  </AuctionProvider>
)
