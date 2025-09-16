import React from 'react';
import type { Server } from '../../types';
import './ServerList.css';

interface ServerListProps {
  servers: Server[];
  currentServer: Server | null;
  onServerSelect: (server: Server | null) => void;
  onCreateServer: () => void;
}

export const ServerList: React.FC<ServerListProps> = ({
  servers,
  currentServer,
  onServerSelect,
  onCreateServer,
}) => {
  return (
    <div className="server-list">
      {/* Home/Direct Messages Button */}
      <div
        className={`server-home ${!currentServer ? 'active' : ''}`}
        onClick={() => {
          console.log('DEBUG: Server home clicked');
          onServerSelect(null);
        }}
        title="Direct Messages"
      >
        <svg width="28" height="20" viewBox="0 0 28 20">
          <path fill="currentColor" d="M23.021 1.677A21.227 21.227 0 0 0 14 0c-.42 0-.839.02-1.256.059a20.976 20.976 0 0 0-8.023 2.584A21.872 21.872 0 0 0 0 14.5a21.872 21.872 0 0 0 4.721 11.857A20.976 20.976 0 0 0 12.744 29.941c.417.04.836.059 1.256.059s.839-.02 1.256-.059a20.976 20.976 0 0 0 8.023-2.584A21.872 21.872 0 0 0 28 14.5a21.872 21.872 0 0 0-4.979-12.823z"/>
        </svg>
      </div>

      {servers.length > 0 && <div className="server-separator" />}

      <div className="server-items">
        {servers.map((server) => (
          <div
            key={server.id}
            className={`server-item ${currentServer?.id === server.id ? 'active' : ''}`}
            onClick={() => {
              console.log('DEBUG: Server item clicked:', server.name);
              onServerSelect(server);
            }}
            title={server.name}
          >
            {server.icon_url ? (
              <img
                src={server.icon_url}
                alt={server.name}
                className="server-icon"
              />
            ) : (
              <div className="server-icon-placeholder">
                {server.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
        ))}

        {/* Add Server Button */}
        <button
          className="create-server-btn"
          onClick={() => {
            console.log('DEBUG: Create server button clicked');
            onCreateServer();
          }}
          title="Add a Server"
          aria-label="Add a Server"
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor" d="M20 11.111h-7.111V4h-1.778v7.111H4v1.778h7.111V20h1.778v-7.111H20z"/>
          </svg>
        </button>

        {servers.length === 0 && (
          <div className="no-servers">
            <p>No servers yet</p>
            <button onClick={() => {
              console.log('DEBUG: Create first server button clicked');
              onCreateServer();
            }} className="create-first-server-btn">
              Create your first server
            </button>
          </div>
        )}
      </div>
    </div>
  );
};