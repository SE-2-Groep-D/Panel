import React, { useState } from 'react';
import {useLocation} from "react-router-dom";
import PopupChatWindow from './PopupChatWindow';
import "@pagestyles/_chat.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "@hooks";


const hideNavigationRoutes  = [
  '/setup',
  '/login',
  '/register',
  '/privacy'
];


function Chat() {

  const route = useLocation();
  const {authenticated} = useAuth();

  if(hideNavigationRoutes.includes(route.pathname) || !authenticated) {
      return null;
  }

  const {userInfo} = useAuth();
  const [isChatOpen, setChatOpen] = useState(false);
  //const userId = '08dc185e-a40e-4f6a-85e2-05b1b7327e85'; // Replace with actual logged-in user's ID
  const userId = userInfo.id; // Replace with actual logged-in user's ID

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
