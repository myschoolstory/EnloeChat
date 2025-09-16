import React from 'react';
import type { Channel, AuthUser } from '../../types';
import './ChatArea.css';

interface ChatAreaProps {
  channel: Channel;
  currentUser: AuthUser | null;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ channel, currentUser }) => {
  return (
    <div className="chat-area">
      <div className="chat-header">
        <h3 className="channel-title">#{channel.name}</h3>
        <div className="channel-info">
          <span className="member-count">0 members</span>
        </div>
      </div>

      <div className="messages-container">
        <div className="welcome-message">
          <h4>Welcome to #{channel.name}!</h4>
          <p>This is the beginning of the #{channel.name} channel.</p>
        </div>
      </div>

      <div className="message-input-container">
        <div className="message-input-wrapper">
          <input
            type="text"
            placeholder={`Message #${channel.name}`}
            className="message-input"
            disabled
          />
          <button className="send-button" disabled>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};