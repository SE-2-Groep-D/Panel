import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PopupChatWindow from "./PopupChatWindow";
import "@pagestyles/_chat.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { useAuth, useChat } from "@hooks";
import { fetchApi, fetchData, isRole, Role } from "@api";

const hideNavigationRoutes = ["/setup", "/login", "/register", "/privacy"];

function Chat() {
  const route = useLocation();
  const { authenticated, userInfo } = useAuth();
  const { bedrijfId, setBedrijfId } = useChat();
  const isErvaringsdeskundige = isRole(Role.Ervaringsdeskundige);

  if (hideNavigationRoutes.includes(route.pathname) || !authenticated) {
    return null;
  }

  const [isChatOpen, setChatOpen] = useState(false);
  //const userId = '08dc185e-a40e-4f6a-85e2-05b1b7327e85'; // Replace with actual logged-in user's ID
  const userId = userInfo.id; // Replace with actual logged-in user's ID

  const toggleChat = async () => {
    if (!isChatOpen && bedrijfId != null && isErvaringsdeskundige) {
      await makeChat(bedrijfId, userInfo.id);
    }
    if (isChatOpen) {
      setBedrijfId(null);
    }
    setChatOpen(!isChatOpen);
  };

  return (
    <div className="App">
      <button
        aria-label="Chat popup open en dicht knop"
        className="chat-toggle-button"
        onClick={toggleChat}
      >
        <FontAwesomeIcon icon={faMessage} className="message-icon fa-lg" />
      </button>
      {isChatOpen && (
        <PopupChatWindow
          onClose={toggleChat}
          userId={userId}
          bedrijfId={bedrijfId}
        />
      )}
    </div>
  );
}

async function makeChat(bedrijfId, userId) {
  const berichten = await fetchData(
    `bericht/getberichten/${bedrijfId}/${userId}`
  );
  const defaultBericht = {
    Tekst:
      "Welkom op de pagina van ons onderzoek, als u vragen heeft stel ze gerust.",
    VerzenderId: bedrijfId,
    OntvangerId: userId,
  };
  if (berichten.length === 0 && bedrijfId != userId) {
    try {
      await fetchApi(`bericht/stuurbericht`, "POST", defaultBericht);
    } catch (error) {
      console.log(error);
    }
  }
}

export default Chat;
