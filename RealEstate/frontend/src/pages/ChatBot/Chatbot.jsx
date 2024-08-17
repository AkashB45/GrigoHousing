import React, { useState, useEffect, useRef } from 'react';
import { sendMessage } from '../../utils/chatService';
import { FaComments, FaUser, FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isInitialState, setIsInitialState] = useState(true);
  const chatbotRef = useRef(null);
  const messagesEndRef = useRef(null);

  const handleToggleChat = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleSendMessage = async () => {
    if (input.trim()) {
      setIsInitialState(false);
      const newMessage = { text: input, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput('');
      setIsTyping(true);

      try {
        const answer = await sendMessage(input);
        setIsTyping(false);
        setMessages((prevMessages) => [...prevMessages, { text: answer, sender: 'bot' }]);
      } catch (error) {
        console.error('Error sending message:', error);
        setIsTyping(false);
        setMessages((prevMessages) => [...prevMessages, { text: 'Sorry, something went wrong. Please try again later.', sender: 'bot' }]);
      }
    }
  };

  const handleClickOutside = (event) => {
    if (window.innerWidth <= 480) {
      return;
    }
    if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <div
        className={`chatbot-icon ${isOpen ? 'hidden' : ''}`} // Apply 'hidden' class conditionally
        onClick={handleToggleChat}
      >
        <FaComments size={30} />
      </div>

      <div ref={chatbotRef} className={`chatbot ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <span>Grigo Housing Assistant</span>
          <button className="close-button" onClick={handleToggleChat}>
            <FaTimes />
          </button>
        </div>
        <div className="chatbot-body">
          <div className="chat-messages">
            {isInitialState ? (
              <div className="welcome-message">
                <div className="welcome-icon">
                  <FaRobot size={40} />
                </div>
                <h2>Welcome to Grigo Housing!</h2>
                <p>How can I assist you today?</p>
                <div className="welcome-suggestions">
                  <button onClick={() => setInput("Hello")}>Hello</button>
                  <button onClick={() => setInput("How do I sell my property?")}>Selling Property</button>
                  <button onClick={() => setInput("What is the process for buying a home?")}>Buying Property</button>
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.sender}`}>
                    <div className="message-icon">
                      {msg.sender === 'user' ? <FaUser /> : <FaRobot />}
                    </div>
                    <div className="message-text">{msg.text}</div>
                  </div>
                ))}
                {isTyping && (
                  <div className="message bot">
                    <div className="message-icon">
                      <FaRobot />
                    </div>
                    <div className="message-text typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Type a message..."
              disabled={!isOpen}
            />
            <button onClick={handleSendMessage} disabled={!isOpen}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
