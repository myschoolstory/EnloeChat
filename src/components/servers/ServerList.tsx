import React from 'react';
import type { Server } from '../../types';
import './ServerList.css';

interface ServerListProps {
  servers: Server[];
  currentServer: Server | null;
  onServerSelect: (server: Server) => void;
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
      <div className="server-list-header">
        <h3>Servers</h3>
        <button
          className="create-server-btn"
          onClick={onCreateServer}
          title="Create Server"
        >
          +
        </button>
      </div>

      <div className="server-items">
        {servers.map((server) => (
          <div
            key={server.id}
            className={`server-item ${currentServer?.id === server.id ? 'active' : ''}`}
            onClick={() => onServerSelect(server)}
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

        {servers.length === 0 && (
          <div className="no-servers">
            <p>No servers yet</p>
            <button onClick={onCreateServer} className="create-first-server-btn">
              Create your first server
            </button>
          </div>
        )}
      </div>
    </div>
  );
};