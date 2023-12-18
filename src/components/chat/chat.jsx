import React, { useState } from 'react';
import '@styles/component/chat/chat.css';
import '@styles/component/chat/chatst1.css';
import '@styles/component/chat/chatst2.css';

const ChatPopup = () => {
    const [showChatbot, setShowChatbot] = useState(false);
    const [userMessage, setUserMessage] = useState('');
    const [chats, setChats] = useState([]);

    const toggleChatbot = () => {
        setShowChatbot(prevShowChatbot => !prevShowChatbot);
    };

    const handleChat = () => {
        if (!userMessage.trim()) return;
        const newChats = [...chats, { message: userMessage, type: 'outgoing' }];
        if (userMessage.toLowerCase() === 'test') {
            newChats.push({ message: 'Test is goed', type: 'incoming' });
        }
        setChats(newChats);
        setUserMessage('');
    };

    return (
        <div>
            <button className="chatbot-toggler" onClick={toggleChatbot}>
                <span className="material-symbols-rounded">mode_comment</span>
                <span className="material-symbols-outlined">close</span>
            </button>

            <div className={`chatbot ${showChatbot ? 'show' : ''}`}>
                <header>
                    {/* header content */}
                </header>
                <ul className="chatbox">
                    {chats.map((chat, index) => (
                        <li key={index} className={`chat ${chat.type}`}>
                            {chat.type === 'incoming' && <span className="material-symbols-outlined">chat</span>}
                            <p>{chat.message}</p>
                        </li>
                    ))}
                </ul>
                <div className="chat-input">
                    <textarea
                        placeholder="Enter a message..."
                        value={userMessage}
                        onChange={(e) => setUserMessage(e.target.value)}
                    />
                    <span onClick={handleChat} className="material-symbols-rounded">send</span>
                </div>
            </div>
        </div>
    );
};

export default ChatPopup;
