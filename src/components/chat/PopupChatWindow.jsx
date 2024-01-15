import React, { useState } from 'react';
import ChatList from './ChatList';
import IndividualChat from './IndividualChat';

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
                        Terug
                    </button>
                )}
                <span>Chats</span>
                <button aria-label="Chat popup sluiten" className="close-button" onClick={onClose}>X</button>
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
