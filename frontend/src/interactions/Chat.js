import React, { useState } from "react";
import { FaPaperPlane, FaTimes } from "react-icons/fa";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isChatVisible, setIsChatVisible] = useState(true);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, message]);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleToggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <div className="relative w-full h-full">
      {isChatVisible ? (
        <div className="w-full h-full flex flex-col justify-end border rounded-lg">
          <div className="p-1 border-b flex items-center justify-between">
            <span>Live Chat</span>
            <button className="text-red-500" onClick={handleToggleChat}>
              <FaTimes />
            </button>
          </div>
          {/* Chat Container */}
          <div className="flex-1 overflow-y-auto text-pretty p-4">
            {messages.map((msg, index) => (
              <div key={index} className="mb-1 p-1 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <img
                    className="w-5 h-5 rounded-full mr-1"
                    alt="user"
                    src="/assets/profile-img/profile-1.png"
                  />
                  <span className="font-semibold text-gray-200">{`User ${
                    index + 1
                  }`}</span>{" "}
                  <p className="ml-5 text-gray-100 text-pretty">{msg}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Input Field and Send Button */}
          <div className="p-2 border-t flex items-center justify-center">
            <input
              style={{ width: "97%" }}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-surface-400 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            {message && (
              <button
                className="ml-2 p-2 bg-gray-500 rounded-full text-white hover:bg-gray-700"
                onClick={handleSendMessage}
              >
                <FaPaperPlane />
              </button>
            )}
          </div>
        </div>
      ) : (
        <button
          className="p-2 bg-gray-500 rounded-full text-white hover:bg-gray-700"
          onClick={handleToggleChat}
        >
          Show Chats
        </button>
      )}
    </div>
  );
};

export default Chat;
