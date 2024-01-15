import React, { useState } from 'react';
import PopupChatWindow from './PopupChatWindow';
import './main.css';

function Chat() {
  const [isChatOpen, setChatOpen] = useState(false);
  const userId = '08dc05b0-3c64-437f-84f0-7bd228d1dc7a'; // Replace with actual logged-in user's ID

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  return (
    <div className="App">
      <button aria-label="Chat popup open en dicht knop" className="chat-toggle-button" onClick={toggleChat}>
        Chat
      </button>
      {isChatOpen && (
        <PopupChatWindow onClose={toggleChat} userId={userId} />
      )}
    </div>
  );
}

export default Chat;
