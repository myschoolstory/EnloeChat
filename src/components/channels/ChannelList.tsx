import React from 'react';
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
  return (
    <div className="channel-list">
      <div className="channel-list-header">
        <h3>{server.name}</h3>
        <button
          className="create-channel-btn"
          onClick={onCreateChannel}
          title="Create Channel"
        >
          +
        </button>
      </div>

      <div className="channel-items">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className={`channel-item ${currentChannel?.id === channel.id ? 'active' : ''}`}
            onClick={() => onChannelSelect(channel)}
          >
            <span className="channel-hash">#</span>
            <span className="channel-name">{channel.name}</span>
          </div>
        ))}

        {channels.length === 0 && (
          <div className="no-channels">
            <p>No channels yet</p>
            <button onClick={onCreateChannel} className="create-first-channel-btn">
              Create your first channel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};