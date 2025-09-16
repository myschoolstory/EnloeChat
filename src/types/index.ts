// User types
export interface User {
  id: string;
  nickname: string;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

// Server types
export interface Server {
  id: string;
  name: string;
  description?: string;
  owner_id: string;
  icon_url?: string;
  created_at: string;
  updated_at: string;
}

export interface ServerMember {
  id: string;
  server_id: string;
  user_id: string;
  role: 'admin' | 'member';
  joined_at: string;
  created_at: string;
  updated_at: string;
}

// Channel types
export interface Channel {
  id: string;
  server_id: string;
  name: string;
  type: 'text' | 'voice';
  created_at: string;
  updated_at: string;
}

// Message types
export interface Message {
  id: string;
  channel_id: string;
  user_id: string;
  content?: string;
  message_type: 'text' | 'image';
  file_url?: string;
  created_at: string;
  edited_at?: string;
  updated_at: string;
}

// DM types
export interface DMChannel {
  id: string;
  participant1_id: string;
  participant2_id: string;
  created_at: string;
  updated_at: string;
}

export interface DMMessage {
  id: string;
  dm_channel_id: string;
  sender_id: string;
  content?: string;
  message_type: 'text' | 'image';
  file_url?: string;
  created_at: string;
  updated_at: string;
}

// UI State types
export interface ChatState {
  currentServer: Server | null;
  currentChannel: Channel | null;
  currentDMChannel: DMChannel | null;
  servers: Server[];
  channels: Channel[];
  messages: Message[];
  dmChannels: DMChannel[];
  dmMessages: DMMessage[];
  onlineUsers: string[];
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  nickname: string;
}

export interface ServerForm {
  name: string;
  description?: string;
}

export interface ChannelForm {
  name: string;
  type: 'text' | 'voice';
}

export interface MessageForm {
  content: string;
  message_type: 'text' | 'image';
  file_url?: string;
}

// Admin types
export interface AdminCredentials {
  password: string;
}

export interface ModerationAction {
  type: 'ban' | 'kick' | 'delete';
  targetUserId: string;
  targetMessageId?: string;
  reason?: string;
}