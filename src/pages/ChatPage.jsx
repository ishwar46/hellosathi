import React, { useState, useEffect } from "react";
import "../css/ChatPage.css";
import Logo from "../assets/images/logohello.png";
import UserAvatar from "../assets/images/man.png";
import BotAvatar from "../assets/images/bot.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import getResponse from "../data/response.js";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [initialMessageShown, setInitialMessageShown] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voices, setVoices] = useState([]);
  const [interimText, setInterimText] = useState("");

  useEffect(() => {
    const synth = window.speechSynthesis;
    const fetchVoices = () => {
      let voicesList = synth.getVoices();
      if (voicesList.length !== 0) {
        setVoices(voicesList);
      } else {
        synth.onvoiceschanged = () => {
          voicesList = synth.getVoices();
          setVoices(voicesList);
        };
      }
    };
    fetchVoices();
  }, []);

  const handleInput = (e) => setInput(e.target.value);

  const handleSend = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = { username: "You", text: input, avatar: UserAvatar };
      setMessages([...messages, userMessage]);
      setInput("");
      setInterimText("");

      setTimeout(() => {
        const botResponseText = getResponse(input);
        const botResponse = {
          username: "Hello Sathi",
          text: botResponseText,
          avatar: BotAvatar,
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
        handleTextToSpeech(botResponseText);
      }, 1000);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const userMessage = {
        username: "You",
        text: `File: ${file.name}`,
        avatar: UserAvatar,
      };
      setMessages([...messages, userMessage]);

      setTimeout(() => {
        const botResponse = {
          username: "Hello Sathi",
          text: "File received. Processing...",
          avatar: BotAvatar,
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
        handleTextToSpeech("File received. Processing...");
      }, 1000);
    }
  };

  const handleSpeechToText = () => {
    setIsListening(true);

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          setInput(event.results[i][0].transcript);
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setInterimText(interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const handleTextToSpeech = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const samanthaVoice = voices.find((voice) => voice.name === "Samantha");
    if (samanthaVoice) {
      utterance.voice = samanthaVoice;
    }
    speechSynthesis.speak(utterance);
  };

  const showInitialMessage = () => {
    if (!initialMessageShown) {
      setInitialMessageShown(true);
      const initialMessage = {
        username: "Hello Sathi",
        text: "Hi there! I'm Hello Sathi, your learning assistant for business domain knowledge. How can I help you today?",
        avatar: BotAvatar,
      };
      setMessages([initialMessage]);
      handleTextToSpeech(initialMessage.text);
    }
  };

  return (
    <div className="chat-page">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src={Logo} className="sidebar-logo" alt="Hello Sathi Logo" />
          <h2 className="sidebar-title">My Chats</h2>
        </div>
        <div className="sidebar-search">
          <input
            type="text"
            placeholder="Search"
            className="sidebar-search-input"
          />
        </div>
        <div className="sidebar-folders">
          <h3>Favourites</h3>
          <ul>
            <li>Work chats</li>
            <li>Life chats</li>
            <li>Project chats</li>
            <li>Client chats</li>
          </ul>
        </div>
        <div className="sidebar-chats">
          <h3>History</h3>
          {messages.map((message, index) => (
            <div key={index} className="history-item">
              <img
                src={message.avatar}
                className="history-avatar"
                alt={`${message.username} Avatar`}
              />
              <div className="history-text">
                <span className="history-username">{message.username}</span>
                <span className="history-message">{message.text}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="new-chat-button" onClick={showInitialMessage}>
          New chat
        </button>
      </aside>
      <div className="chat-container">
        <div className="chat-header">
          <h2>Chat with Hello Sathi</h2>
        </div>
        <div className="chat-history">
          {messages.length === 0 && (
            <div className="welcome-message">
              <p>Start a conversation to see messages here.</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${
                message.username === "You" ? "self" : "bot"
              }`}
            >
              <img
                src={message.avatar}
                className="chat-avatar"
                alt={`${message.username} Avatar`}
              />
              <div className="chat-bubble">
                <span className="chat-text">{message.text}</span>
              </div>
            </div>
          ))}
          {isListening && (
            <div className="chat-message bot">
              <img
                src={BotAvatar}
                className="chat-avatar"
                alt="Hello Sathi Avatar"
              />
              <div className="chat-bubble">
                <span className="chat-text">Listening...</span>
              </div>
            </div>
          )}
          {interimText && (
            <div className="chat-message self">
              <img src={UserAvatar} className="chat-avatar" alt="User Avatar" />
              <div className="chat-bubble">
                <span className="chat-text">{interimText}</span>
              </div>
            </div>
          )}
        </div>
        <form className="chat-input-container" onSubmit={handleSend}>
          <input
            type="text"
            className="chat-input"
            value={input}
            onChange={handleInput}
            placeholder="Type your message..."
          />
          <button
            type="button"
            className="icon-button"
            onClick={handleSpeechToText}
          >
            <i className="fas fa-microphone"></i>
          </button>
          <label htmlFor="file-upload" className="icon-button">
            <i className="fas fa-paperclip"></i>
          </label>
          <input
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
          <button type="submit" className="chat-send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
