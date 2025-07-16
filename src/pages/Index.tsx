import React, { useState, useEffect } from "react";
import LuxuryHero from "@/components/LuxuryHero";
import CollectionPreview, { WaitlistContext } from "@/components/CollectionPreview";
import WaitlistForm from "@/components/WaitlistForm";

const Index = () => {
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    // Check localStorage for join state
    if (localStorage.getItem('waitlist_joined') === 'true') {
      setJoined(true);
    }
  }, []);

  const handleJoin = () => {
    setJoined(true);
    localStorage.setItem('waitlist_joined', 'true');
  };

  return (
    <WaitlistContext.Provider value={{ joined }}>
      <LuxuryHero />
      <CollectionPreview />
      <WaitlistForm onJoin={handleJoin} joined={joined} />
    </WaitlistContext.Provider>
  );
};

export default Index;
