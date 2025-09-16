import React from 'react';
import type { Channel, AuthUser } from '../../types';
import './ChatArea.css';

interface ChatAreaProps {
  channel: Channel;
  currentUser: AuthUser | null;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ channel, currentUser }) => {
  return (
    <div className="chat-area" role="region" aria-labelledby="channel-title">
      <header className="chat-header">
        <h3 id="channel-title" className="channel-title">
          {channel.name}
        </h3>
        <div className="channel-info" aria-label="Channel information">
          <div className="header-toolbar">
            <button className="toolbar-icon" title="Toggle Member List" aria-label="Toggle Member List">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M14 8.00598C14 10.211 12.206 12.006 10 12.006C7.795 12.006 6 10.211 6 8.00598C6 5.80098 7.794 4.00598 10 4.00598C12.206 4.00598 14 5.80098 14 8.00598Z"/>
                <path fill="currentColor" d="M2 19.006C2 15.473 5.29 13.006 10 13.006C14.711 13.006 18 15.473 18 19.006V20.006H2V19.006Z"/>
                <path fill="currentColor" d="M20.0001 20.006H22.0001V19.006C22.0001 16.4433 20.2697 14.4415 17.5213 13.5352C19.0621 14.9127 20.0001 16.8059 20.0001 19.006V20.006Z"/>
                <path fill="currentColor" d="M14.8834 11.9077C16.6657 11.5044 18.0001 9.9077 18.0001 8.00598C18.0001 5.96916 16.4693 4.28218 14.4971 4.0367C15.4322 5.09511 16.0001 6.48524 16.0001 8.00598C16.0001 9.44888 15.4889 10.7742 14.6378 11.8102C14.7203 11.8584 14.8022 11.8888 14.8834 11.9077Z"/>
              </svg>
            </button>
            <button className="toolbar-icon" title="Pinned Messages" aria-label="Pinned Messages">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22 12L12.101 2.10101L11.394 2.80807L4.00003 10.2021L4.00003 14.8999V16.8999L6.00003 16.8999L7.00003 15.8999V14.4142L14.2929 7.12132L17.1213 9.94975L9.82843 17.2426L8.41422 15.8284L7 17.2426L11.95 22.1924L19.3137 14.8287L22 12Z"/>
              </svg>
            </button>
            <button className="toolbar-icon" title="Search" aria-label="Search">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.109 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.109 14.242 14.243C13.109 15.376 11.603 16 10 16Z"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div
        className="messages-container thin-scrollbar"
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
        aria-atomic="false"
      >
        <div className="welcome-message" role="status">
          <h4>Welcome to #{channel.name}!</h4>
          <p>This is the beginning of the #{channel.name} channel.</p>
        </div>
      </div>

      <div className="message-input-container" role="region" aria-label="Message input">
        <div className="message-input-wrapper">
          <div className="input-actions">
            <button className="input-action" title="Upload File" aria-label="Upload File">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"/>
              </svg>
            </button>
          </div>
          <label htmlFor="message-input" className="sr-only">
            Message #{channel.name}
          </label>
          <input
            id="message-input"
            type="text"
            placeholder={`Message #${channel.name}`}
            className="message-input"
            disabled
            aria-describedby="message-help"
            autoComplete="off"
          />
          <span id="message-help" className="sr-only">
            Type your message and press Enter to send
          </span>
          <div className="input-actions">
            <button className="input-action" title="Emoji" aria-label="Insert Emoji">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 2C6.477 2 2 6.477 2 12C2 17.522 6.477 22 12 22C17.523 22 22 17.522 22 12C22 6.477 17.523 2 12 2ZM16.293 6.293L17.707 7.706L16.414 9L17.707 10.293L16.293 11.706L13.586 9L16.293 6.293ZM6.293 7.706L7.707 6.293L10.414 9L7.707 11.706L6.293 10.293L7.586 9L6.293 7.706ZM12 19C9.609 19 7.412 17.868 6 16.043L7.559 14.486C8.555 15.92 10.196 16.831 12 16.831C13.809 16.831 15.447 15.92 16.443 14.481L18 16.04C16.59 17.867 14.396 19 12 19Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};