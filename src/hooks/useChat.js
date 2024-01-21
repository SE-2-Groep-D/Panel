import { useContext } from 'react';
import { ChatContext } from '@context';

export function useChat() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useBedrijfId must be used within a BedrijfIdProvider');
  }

  return context;
}