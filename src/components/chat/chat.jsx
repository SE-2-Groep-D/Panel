import React, { useState } from 'react';
import PopupChatWindow from './PopupChatWindow';
import "@pagestyles/_chat.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

function Chat() {
  const [isChatOpen, setChatOpen] = useState(false);
  const userId = '08dc15d5-8cec-4cb8-803e-efbe6a46efa9'; // Replace with actual logged-in user's ID

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  return (
    <div className="App">
      <button aria-label="Chat popup open en dicht knop" className="chat-toggle-button" onClick={toggleChat}>
      <FontAwesomeIcon icon={faMessage} className="message-icon fa-lg" />
      </button>
      {isChatOpen && (
        <PopupChatWindow onClose={toggleChat} userId={userId} />
      )}
    </div>
  );
}

export default Chat;
