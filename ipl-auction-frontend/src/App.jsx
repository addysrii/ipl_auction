import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Teams from "./pages/Teams";
import Players from "./pages/Players";
import Auction from "./pages/Auction";
import AdminAuction from "./pages/AdminAuction";
import AudienceAuction from "./pages/AudienceAuction";
import AdminDashboard from "./pages/AdminDashboard";
import TeamLogin from "./pages/TeamLoginPage";
import TeamDashboard from "./pages/TeamDashboard";
import TeamAuction from "./pages/TeamAuction";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<TeamLogin />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/players" element={<Players />} />
    <Route path="/audience/:id" element={<AudienceAuction />} />
 <Route path="/admin/auction/:id" element={<AdminAuction />} />
         <Route path="/admindashboard" element={<AdminDashboard />} />
  <Route path="/team/dashboard" element={<TeamDashboard/>} />
      <Route path="/team/auction/:id" element={<TeamAuction />} />
      </Routes>
    
    </BrowserRouter>
  );
}
