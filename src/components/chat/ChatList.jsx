import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to install axios if not already installed

const ChatList = ({ onSelectChat, userId }) => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get(`https://localhost:5000/Bericht/chats/${userId}`);
                setChats(response.data);
            } catch (error) {
                console.error('Error fetching chats:', error);
            }
        };
    
        fetchChats();
    }, []);

    return (
        <div className="chat-list">
            {chats.map((chat) => (
                <ul className="chat-list-items" key={chat.otherUserId} onClick={() => onSelectChat(chat.otherUserId)}>
                        <li>
                            <span>{chat.naam}</span>
                        </li>
                </ul>
            ))}
        </div>
    );
};

export default ChatList;
