import React, { createContext, useState } from 'react';

export const ColorsContext = createContext<string>('#FFFFFF');

export const ColorsProvider: React.FC = ({ children }) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('#FFFFFF');

  return (
    <ColorsContext.Provider value={backgroundColor}>
      {children}
    </ColorsContext.Provider>
  );
};
