import { createContext, useContext, useState } from 'react';

const TeamDataContext = createContext();

export const useTeamDataContext = () => useContext(TeamDataContext);

export const TeamDataProvider = ({ children }) => {
  const [teamData, setTeamData] = useState(null);

  const updateTeamData = (data) => {
    setTeamData(data);
  };

  return (
    <TeamDataContext.Provider value={{ teamData, updateTeamData }}>
      {children}
    </TeamDataContext.Provider>
  );
};
