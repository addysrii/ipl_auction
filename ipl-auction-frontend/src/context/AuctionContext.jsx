import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/api";
import { socket } from "../api/socket";

const AuctionContext = createContext();

export const AuctionProvider = ({ children }) => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [auction, setAuction] = useState(null);
  const [bids, setBids] = useState([]);

  useEffect(() => {
    API.get("/teams").then(res => setTeams(res.data));
    API.get("/players").then(res => setPlayers(res.data));
    API.get("/auctions").then(res => setAuction(res.data[0]));
  }, []);

  useEffect(() => {
    socket.on("newBid", bid => {
      setBids(prev => [...prev, bid]);
    });
    return () => socket.off("newBid");
  }, []);

  return (
    <AuctionContext.Provider value={{
      teams, players, auction, bids,
      setTeams, setPlayers, setAuction
    }}>
      {children}
    </AuctionContext.Provider>
  );
};

export const useAuction = () => useContext(AuctionContext);
