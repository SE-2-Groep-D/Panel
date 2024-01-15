import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { HubConnectionBuilder } from '@microsoft/signalr';

const IndividualChat = ({ userId, otherUserId }) => {
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState({});
    const [connection, setConnection] = useState(null);

    //console.log('UserID:', userId, 'OtherUserID:', otherUserId);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(`https://localhost:5000/chatHub?username=${encodeURIComponent(userId)}`)
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, [userId]);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    //console.log('Connection started!');
                    connection.on('ReceivePrivateMessage', (getmess) => {
                        if (getmess.trim()) {
                            setAllMessages(prevAllMessages => {
                                const currentMessages = prevAllMessages[otherUserId] || [];
                                const newMessage = {
                                    id: currentMessages.length + 1,
                                    tekst: getmess,
                                    type: 'received'
                                };
                    
                                return {
                                    ...prevAllMessages,
                                    [otherUserId]: [...currentMessages, newMessage]
                                };
                            });
                        }
                    });
                })
                .catch(err => console.error('Connection failed: ', err));
        }
    }, [connection]);

    
    const sendMessage = async () => {
        if (connection.state === "Connected") {
            try {
                await connection.invoke('SendMessageToUser', otherUserId, message);
                
            } catch (e) {
                console.error(e);
            }
        } else {
            alert('No connection to server yet.');
        }
    };

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`https://localhost:5000/Bericht/getberichten/${otherUserId}/${userId}`);
                const formattedMessages = response.data.map(msg => ({
                    ...msg,
                    type: msg.verzenderId === userId ? 'sent' : 'received'
                }));
                setAllMessages(prevMessages => ({
                    ...prevMessages,
                    [otherUserId]: formattedMessages
                }));
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
    
        if (userId && otherUserId) {
            fetchMessages();
        }
    }, [userId, otherUserId]);
    

    const messages = allMessages[otherUserId] || [];
    

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessage = {
                id: messages.length + 1,
                tekst: message,
                type: 'sent'
            };
    
            setAllMessages({
                ...allMessages,
                [otherUserId]: [...messages, newMessage]
            });
            setMessage('');
        }
    };
    

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleBoth();
        }
    };

    function handleBoth() {
        handleSendMessage();
        sendMessage();
    
        // Prepare the payload for the POST request
        const payload = {
            tekst: message,
            verzenderId: userId,
            ontvangerId: otherUserId
        };
    
        // Make the POST request
        axios.post('https://localhost:5000/Bericht/stuurbericht', payload)
            .then(response => {
                //console.log('Message sent:', response.data);
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    }

    return (
        <div className="individual-chat">
                <ul aria-label="Lijst van je berichten" className="message-list" aria-live="polite">
                    {messages.map((msg, index) => (
                        <li key={index} className={`message ${msg.type}`}>
                            <span className={msg.type}><p>{msg.tekst}</p></span> {/* Updated from msg.text to msg.tekst */}
                        </li>
                    ))}
                </ul>
            <div className="message-input-area">
                <input
                    type="text"
                    maxLength="250"
                    minLength="1"
                    aria-label="Typ hier een bericht in"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Typ een bericht..."
                />
                <button className="send-button" aria-label="Stuur bericht knop" onClick={handleBoth}>Stuur</button>
            </div>
        </div>
    );
};

export default IndividualChat;
