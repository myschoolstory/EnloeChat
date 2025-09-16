import React from 'react';
import type { AuthUser, User } from '../../types';
import './UserPanel.css';

interface UserPanelProps {
  user: AuthUser | null;
  profile: User | null;
  onSignOut: () => Promise<void>;
}

export const UserPanel: React.FC<UserPanelProps> = ({ user, profile, onSignOut }) => {
  const handleSignOut = async () => {
    try {
      await onSignOut();
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <div className="user-panel">
      <div className="user-info">
        <div className="user-avatar">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="Avatar" />
          ) : (
            <div className="avatar-placeholder">
              {profile?.nickname?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || '?'}
            </div>
          )}
        </div>
        <div className="user-details">
          <div className="user-name">{profile?.nickname || user?.email || 'User'}</div>
          <div className="user-status">Online</div>
        </div>
      </div>

      <div className="user-actions">
        <button
          className="sign-out-btn"
          onClick={handleSignOut}
          title="Sign Out"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};