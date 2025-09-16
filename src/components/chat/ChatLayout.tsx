import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { serverService } from '../../services/insforge';
import type { Server, Channel } from '../../types';
import { ServerList } from '../servers/ServerList';
import { ChannelList } from '../channels/ChannelList';
import { ChatArea } from './ChatArea';
import { UserPanel } from './UserPanel';
import './ChatLayout.css';

export const ChatLayout: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const [servers, setServers] = useState<Server[]>([]);
  const [currentServer, setCurrentServer] = useState<Server | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserServers();
    }
  }, [user]);

  useEffect(() => {
    if (currentServer) {
      loadServerChannels();
    }
  }, [currentServer]);

  const loadUserServers = async () => {
    if (!user) return;

    try {
      const response = await serverService.getUserServers(user.id);
      if (response.data) {
        setServers(response.data);
        // Set first server as current if available
        if (response.data.length > 0 && !currentServer) {
          setCurrentServer(response.data[0]);
        }
      }
    } catch (error) {
      console.error('Failed to load servers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadServerChannels = async () => {
    if (!currentServer) return;

    try {
      const response = await serverService.getServerChannels(currentServer.id);
      if (response.data) {
        setChannels(response.data);
        // Set first channel as current if available
        if (response.data.length > 0 && !currentChannel) {
          setCurrentChannel(response.data[0]);
        }
      }
    } catch (error) {
      console.error('Failed to load channels:', error);
    }
  };

  const handleServerSelect = (server: Server) => {
    setCurrentServer(server);
    setCurrentChannel(null); // Reset channel when switching servers
  };

  const handleChannelSelect = (channel: Channel) => {
    setCurrentChannel(channel);
  };

  if (isLoading) {
    return (
      <div className="chat-layout loading">
        <div className="loading-spinner">Loading your chat...</div>
      </div>
    );
  }

  return (
    <div className="chat-layout">
      {/* Server List Sidebar */}
      <div className="server-sidebar">
        <ServerList
          servers={servers}
          currentServer={currentServer}
          onServerSelect={handleServerSelect}
          onCreateServer={() => {
            // TODO: Implement create server modal
            console.log('Create server clicked');
          }}
        />
      </div>

      {/* Channel List */}
      <div className="channel-sidebar">
        {currentServer && (
          <ChannelList
            server={currentServer}
            channels={channels}
            currentChannel={currentChannel}
            onChannelSelect={handleChannelSelect}
            onCreateChannel={() => {
              // TODO: Implement create channel modal
              console.log('Create channel clicked');
            }}
          />
        )}
      </div>

      {/* Main Chat Area */}
      <div className="chat-main">
        {currentChannel ? (
          <ChatArea
            channel={currentChannel}
            currentUser={user}
          />
        ) : (
          <div className="chat-placeholder">
            <h2>Welcome to {currentServer?.name || 'EnloeChat'}</h2>
            <p>Select a channel to start chatting!</p>
          </div>
        )}
      </div>

      {/* User Panel */}
      <div className="user-panel">
        <UserPanel
          user={user}
          profile={profile}
          onSignOut={signOut}
        />
      </div>
    </div>
  );
};