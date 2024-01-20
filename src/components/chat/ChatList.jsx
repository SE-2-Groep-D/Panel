import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {getHostName} from '@api';

const ChatList = ({ onSelectChat, userId }) => {
    const [chats, setChats] = useState([]);
    const hostname = getHostName();

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const response = await axios.get(`${hostname}/Bericht/chats/${userId}`, {
                    withCredentials: true
                });
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
