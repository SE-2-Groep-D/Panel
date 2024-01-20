import { createContext, useEffect, useState } from "react";

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [bedrijfId, setBedrijfId] = useState(null);

  useEffect(() => console.log(bedrijfId), [bedrijfId]);

  return (
    <ChatContext.Provider value={{ bedrijfId, setBedrijfId }}>
      {children}
    </ChatContext.Provider>
  );
}
