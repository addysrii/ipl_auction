import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Teams from "./pages/Teams";
import Players from "./pages/Players";
import Auction from "./pages/Auction";
import AdminAuction from "./pages/AdminAuction";
import AudienceAuction from "./pages/AudienceAuction";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/players" element={<Players />} />
        <Route path="/adminauction" element={<AdminAuction  />} />
        <Route path="/auction" element={<AudienceAuction />} />
      </Routes>
    </BrowserRouter>
  );
}
