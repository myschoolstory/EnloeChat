import React, { useState } from 'react';
import type { Server, Channel } from '../../types';
import './ChannelList.css';

interface ChannelListProps {
  server: Server;
  channels: Channel[];
  currentChannel: Channel | null;
  onChannelSelect: (channel: Channel) => void;
  onCreateChannel: () => void;
}

export const ChannelList: React.FC<ChannelListProps> = ({
  server,
  channels,
  currentChannel,
  onChannelSelect,
  onCreateChannel,
}) => {
  const [categoryCollapsed, setCategoryCollapsed] = useState(false);

  const textChannels = channels.filter(ch => ch.type === 'text');
  const voiceChannels = channels.filter(ch => ch.type === 'voice');

  return (
    <div className="channel-list">
      <div className="channel-list-header">
        <h3>{server.name}</h3>
        <button
          className="create-channel-btn"
          onClick={() => {
            console.log('DEBUG: Create channel button clicked');
            onCreateChannel();
          }}
          title="Create Channel"
          aria-label="Create Channel"
        >
          +
        </button>
      </div>

      <div className="channel-items thin-scrollbar">
        {/* Text Channels Category */}
        {textChannels.length > 0 && (
          <div className="channel-category">
            <div
              className={`category-header ${categoryCollapsed ? 'collapsed' : ''}`}
              onClick={() => {
                console.log('DEBUG: Category header clicked');
                setCategoryCollapsed(!categoryCollapsed);
              }}
            >
              <svg className="category-arrow" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M9.29 15.88L13.17 12 9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"/>
              </svg>
              <span className="category-name">Text Channels</span>
            </div>
            {!categoryCollapsed && textChannels.map((channel) => (
              <div
                key={channel.id}
                className={`channel-item ${currentChannel?.id === channel.id ? 'active' : ''}`}
                onClick={() => {
                  console.log('DEBUG: Channel item clicked:', channel.name);
                  onChannelSelect(channel);
                }}
              >
                <span className="channel-hash">#</span>
                <span className="channel-name">{channel.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Voice Channels Category */}
        {voiceChannels.length > 0 && (
          <div className="channel-category">
            <div className="category-header">
              <svg className="category-arrow" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M9.29 15.88L13.17 12 9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"/>
              </svg>
              <span className="category-name">Voice Channels</span>
            </div>
            {voiceChannels.map((channel) => (
              <div
                key={channel.id}
                className={`channel-item ${currentChannel?.id === channel.id ? 'active' : ''}`}
                onClick={() => {
                  console.log('DEBUG: Voice channel item clicked:', channel.name);
                  onChannelSelect(channel);
                }}
              >
                <svg className="channel-voice-icon" width="20" height="20" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904Z"/>
                  <path fill="currentColor" d="M14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195Z"/>
                  <path fill="currentColor" d="M14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z"/>
                </svg>
                <span className="channel-name">{channel.name}</span>
              </div>
            ))}
          </div>
        )}

        {channels.length === 0 && (
          <div className="no-channels">
            <p>No channels yet</p>
            <button onClick={() => {
              console.log('DEBUG: Create first channel button clicked');
              onCreateChannel();
            }} className="create-first-channel-btn">
              Create your first channel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};