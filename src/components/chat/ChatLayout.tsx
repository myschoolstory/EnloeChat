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
    <div className="chat-layout" role="application" aria-label="EnloeChat application">
      {/* Skip to main content link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Server List Sidebar */}
      <nav
        className="server-sidebar"
        role="navigation"
        aria-label="Server list"
      >
        <ServerList
          servers={servers}
          currentServer={currentServer}
          onServerSelect={handleServerSelect}
          onCreateServer={() => {
            // TODO: Implement create server modal
            console.log('Create server clicked');
          }}
        />
      </nav>

      {/* Channel List */}
      <aside
        className="channel-sidebar"
        role="complementary"
        aria-label="Channel list"
      >
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
      </aside>

      {/* Main Chat Area */}
      <main
        id="main-content"
        className="chat-main"
        role="main"
        aria-label="Chat area"
      >
        {currentChannel ? (
          <ChatArea
            channel={currentChannel}
            currentUser={user}
          />
        ) : (
          <div className="chat-placeholder" role="region" aria-live="polite">
            <h2>Welcome to {currentServer?.name || 'EnloeChat'}</h2>
            <p>Select a channel to start chatting!</p>
          </div>
        )}
      </main>

      {/* User Panel */}
      <aside
        className="user-panel"
        role="complementary"
        aria-label="User information"
      >
        <UserPanel
          user={user}
          profile={profile}
          onSignOut={signOut}
        />
      </aside>
    </div>
  );
};