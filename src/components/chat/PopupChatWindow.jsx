import React, { useState } from 'react';
import ChatList from './ChatList';
import IndividualChat from './IndividualChat';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

const PopupChatWindow = ({ onClose, userId }) => { // Assuming userId is available here
    const [activeChat, setActiveChat] = useState({ userId: null, otherUserId: null });

    const handleChatSelect = (otherUserId) => {
        setActiveChat({ userId, otherUserId });
    };

    const handleBack = () => {
        setActiveChat({ userId: null, otherUserId: null });
    };

    return (
        <div className="popup-chat-window">
            <div className="chat-header">
                {activeChat.otherUserId && (
                    <button aria-label="Terug naar chat lijst" className="back-button" onClick={handleBack}>
                        <span className="back-icon"><FontAwesomeIcon icon={faChevronLeft} className="fa-solid fa-lg" /></span>
                    </button>
                )}
                <span>Chat</span>
                <button aria-label="Chat popup sluiten" className="close-button" onClick={onClose}>
                <span className="x-icon"><FontAwesomeIcon icon={faXmark} className="close-icon fa-solid fa-lg" /></span>
                </button>
            </div>
            {activeChat.otherUserId ? (
                <IndividualChat userId={activeChat.userId} otherUserId={activeChat.otherUserId} />
            ) : (
                <ChatList onSelectChat={handleChatSelect} userId={userId} />
            )}
        </div>
    );
};

export default PopupChatWindow;
